import os
import sys
import time
from dotenv import load_dotenv
from fastapi import FastAPI, HTTPException, Depends, Header
from fastapi.middleware.cors import CORSMiddleware
from supabase import create_client, Client

# Ensure the 'backend' directory is in the python path for absolute imports
sys.path.append(os.path.dirname(os.path.abspath(__file__)))

# Import Institutional Adapters
try:
    from adapters.up_adapter import UPAdapter
    from adapters.uct_adapter import UCTAdapter
    from adapters.saqa_adapter import SAQAAdapter
except ImportError:
    # Fallback for environments where the root is different
    from backend.adapters.up_adapter import UPAdapter
    from backend.adapters.uct_adapter import UCTAdapter
    from backend.adapters.saqa_adapter import SAQAAdapter

load_dotenv()

app = FastAPI(title="Sumbandila Hybrid Logic Engine - Phase 4")

# CORS Configuration
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Authentication Dependency (Phase 4: JWT)
async def get_user_from_jwt(authorization: str = Header(None)):
    if not authorization:
        raise HTTPException(status_code=401, detail="Missing Authorization Header")
    
    token = authorization.replace("Bearer ", "")
    try:
        if not supabase:
            raise HTTPException(status_code=503, detail="Supabase not configured on backend")
            
        # Verify user session via Supabase Auth
        res = supabase.auth.get_user(token)
        if not res or not res.user:
            raise HTTPException(status_code=401, detail="Invalid or expired session")
        return res.user
    except Exception as e:
        raise HTTPException(status_code=401, detail=f"Authentication Failure: {str(e)}")

# Supabase Client Initialization
url: str = os.environ.get("SUPABASE_URL", "")
key: str = os.environ.get("SUPABASE_SERVICE_ROLE_KEY", "")

# Graceful check for Phase 4 startup
supabase = None
if not url or "your_supabase" in url:
    print("⚠️ CRITICAL: SUPABASE_URL is missing or still using 'your_supabase_url_here' placeholder in .env")
elif not key or "your_supabase" in key:
    print("⚠️ CRITICAL: SUPABASE_SERVICE_ROLE_KEY is missing or still using 'your_supabase_...' placeholder in .env")
else:
    try:
        supabase: Client = create_client(url, key)
        print("✅ Supabase Logic Engine: Connection Established")
    except Exception as e:
        print(f"❌ Supabase Connection Failed: {str(e)}")

# Initialize Logic Adapters (Move inside a check if needed, but let's keep them accessible)
adapters = {
    "up": UPAdapter(),
    "uct": UCTAdapter(),
    "saqa": SAQAAdapter()
}

# Rate Limiting Store
rate_limits = {}

@app.get("/")
async def health_check():
    return {
        "status": "online", 
        "platform": "Sumbandila DPVI", 
        "phase": 4, 
        "security": "JWT_ENABLED"
    }

@app.post("/fraud/detect")
async def detect_fraud_patterns(user_id: str):
    """
    Phase 3/4: Logic Engine for detecting suspicious activity.
    """
    try:
        if not supabase:
            return {"user_id": user_id, "fraud_score": 0.0, "recommendation": "LOGIC_BYPASSED"}
            
        response = supabase.table("verifications")\
            .select("status")\
            .eq("user_id", user_id)\
            .order("created_at", { "ascending": False })\
            .limit(50)\
            .execute()
        
        history = response.data
        if not history:
            return {"user_id": user_id, "fraud_score": 0.0, "recommendation": "LOW_RISK"}

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
        raise HTTPException(status_code=500, detail=f"Fraud Check Error: {str(e)}")

@app.get("/verify/education/{institution}")
async def verify_institutional_data(
    institution: str, 
    reg_number: str, 
    user: dict = Depends(get_user_from_jwt)
):
    """
    Core Verification Engine with Phase 4 Security (JWT + Rate Limiting).
    """
    user_id = user.id if hasattr(user, 'id') else user.get('id')
    
    # 🚦 Rate Limiting (20 checks/hour)
    now = time.time()
    user_requests = rate_limits.get(user_id, [])
    user_requests = [t for t in user_requests if now - t < 3600]
    
    if len(user_requests) >= 20:
        raise HTTPException(status_code=429, detail="Verification limit reached. Please try again in an hour.")
    
    user_requests.append(now)
    rate_limits[user_id] = user_requests

    # 🔍 Verification Logic
    adapter = adapters.get(institution.lower())
    if not adapter:
        raise HTTPException(status_code=404, detail="Institution adapter not found")
    
    result = adapter.verify(reg_number)
    
    # 💾 Audit Logging
    if supabase:
        try:
            supabase.table("verifications").insert({
                "user_id": user_id,
                "institution": institution,
                "registration_number": reg_number,
                "status": result.get("status", "UNKNOWN"),
                "payload": result
            }).execute()
        except Exception as e:
            print(f"⚠️ Audit Log Error: {str(e)}")

    return result

if __name__ == "__main__":
    import uvicorn
    uvicorn.run(app, host="0.0.0.0", port=8000)
