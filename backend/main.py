import os
import sys
from dotenv import load_dotenv

# Ensure the 'backend' directory is in the python path for absolute imports
sys.path.append(os.path.dirname(os.path.abspath(__file__)))

from fastapi import FastAPI, HTTPException, Depends
from fastapi.middleware.cors import CORSMiddleware
from supabase import create_client, Client
try:
    from adapters.up_adapter import UPAdapter
    from adapters.uct_adapter import UCTAdapter
    from adapters.saqa_adapter import SAQAAdapter
except ImportError:
    from backend.adapters.up_adapter import UPAdapter
    from backend.adapters.uct_adapter import UCTAdapter
    from backend.adapters.saqa_adapter import SAQAAdapter

from fastapi import Header

load_dotenv()

app = FastAPI(title="Sumbandila Hybrid Logic Engine")

# X-API-Key for Backend Security
API_KEY = os.environ.get("BACKEND_API_KEY", "sumbandila_master_key_2026")

# CORS and Security
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"], # Expand to specific domains in Prod
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

async def verify_api_key(api_key: str = Depends(lambda x: x)):
    # Simple header-based key check
    pass # We will use a more standard FastAPI Depend below

# Supabase Client Initialization
url: str = os.environ.get("SUPABASE_URL", "")
key: str = os.environ.get("SUPABASE_SERVICE_ROLE_KEY", "") # Sensitive
if not url or not key:
    print("⚠️ WARNING: SUPABASE_URL or SUPABASE_SERVICE_ROLE_KEY not found in environment.")

supabase: Client = create_client(url, key)

# Initialize Adapters
adapters = {
    "up": UPAdapter(),
    "uct": UCTAdapter(),
    "saqa": SAQAAdapter()
}

@app.get("/")
async def health_check():
    return {"status": "online", "platform": "Sumbandila DPVI", "version": "1.0.0"}

@app.get("/stats/verifications")
async def get_verification_stats():
    """
    Fetch global verification statistics for the admin dashboard.
    """
    try:
        response = supabase.table("verifications").select("status", count="exact").execute()
        return {"data": response.data, "count": response.count}
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))

@app.post("/fraud/detect")
async def detect_fraud_patterns(user_id: str):
    """
    Phase 3: Logic Engine for detecting suspicious activity.
    Checks for high-volume searches or conflicting registration data.
    """
    try:
        # Fetch last 50 verifications for this user
        response = supabase.table("verifications")\
            .select("registration_number", "status")\
            .eq("user_id", user_id)\
            .order("created_at", { "ascending": False })\
            .limit(50)\
            .execute()
        
        history = response.data
        if not history:
            return {"user_id": user_id, "fraud_score": 0.0, "recommendation": "LOW_RISK"}

        # Logic: If more than 5 failed verifications in 24h, flag for review
        failed_count = sum(1 for v in history if v.get("status") == "NOT_FOUND")
        
        fraud_score = (failed_count / 10.0) if failed_count < 10 else 1.0
        recommendation = "HIGH_RISK" if fraud_score > 0.6 else "MEDIUM_RISK" if fraud_score > 0.3 else "LOW_RISK"

        return {
            "user_id": user_id, 
            "fraud_score": fraud_score, 
            "recommendation": recommendation,
            "failed_attempts": failed_count
        }
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))

@app.get("/verify/education/{institution}")
async def verify_institutional_data(
    institution: str, 
    reg_number: str, 
    requester_id: str = "anonymous",
    x_api_key: str = Header(None)
):
    """
    Route verification requests to the specific institutional adapter.
    Requires X-API-Key header for security.
    """
    if x_api_key != API_KEY:
        raise HTTPException(status_code=403, detail="Unauthorized: Invalid API Key")

    adapter = adapters.get(institution.lower())
    if not adapter:
        raise HTTPException(status_code=404, detail="Institution adapter not found")
    
    result = adapter.verify(reg_number)
    
    # NEW: Persist to Supabase
    try:
        supabase.table("verifications").insert({
            "user_id": requester_id,
            "institution": institution,
            "registration_number": reg_number,
            "status": result.get("status"),
            "data_payload": result
        }).execute()
    except Exception as e:
        print(f"⚠️ Failed to log verification to Supabase: {str(e)}")

    return result

if __name__ == "__main__":
    import uvicorn
    uvicorn.run(app, host="0.0.0.0", port=8000)
