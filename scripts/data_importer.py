import csv
import os
from typing import Any, Dict
from supabase import create_client, Client
from dotenv import load_dotenv

load_dotenv()

# SUPABASE_URL and SUPABASE_SERVICE_ROLE_KEY are required for bulk imports
url = os.environ.get("EXPO_PUBLIC_SUPABASE_URL")
key = os.environ.get("SUPABASE_SERVICE_ROLE_KEY") # Service role key for bypass RLS

if not url or not key:
    print("❌ Error: EXPO_PUBLIC_SUPABASE_URL or SUPABASE_SERVICE_ROLE_KEY not found.")
    exit(1)

supabase: Client = create_client(url, key)

def import_institutions(file_path: str):
    """
    Import institutions from a CSV file into the Supabase 'institutions' table.
    Expects columns: name, type, registration_number, accredited, location
    """
    print(f"🚀 Starting import: {file_path}")
    
    with open(file_path, mode='r', encoding='utf-8') as f:
        reader = csv.DictReader(f)
        records: list[dict[str, Any]] = []
        for row in reader:
            # Type casting for bool
            if 'accredited' in row:
                row['accredited'] = row['accredited'].lower() == 'true'
            records.append(row)
        
        # Batch insert for performance
        batch_size = 500
        for i in range(0, len(records), batch_size):
            # Use list comprehension to avoid Pyre slicing issues
            batch = [records[j] for j in range(i, min(i + batch_size, len(records)))]
            try:
                supabase.table('institutions').insert(batch).execute()
                print(f"✅ Imported batch {i // batch_size + 1}")
            except Exception as e:
                print(f"❌ Error in batch {i // batch_size + 1}: {e}")

def import_professionals(file_path: str):
    """
    Import professionals from a CSV file into the Supabase 'professionals' table.
    Expects columns: full_name, profession, registration_number, is_verified, specialization
    """
    print(f"🚀 Starting import: {file_path}")
    
    with open(file_path, mode='r', encoding='utf-8') as f:
        reader = csv.DictReader(f)
        records: list[dict[str, Any]] = []
        for row in reader:
            if 'is_verified' in row:
                row['is_verified'] = row['is_verified'].lower() == 'true'
            records.append(row)
            
        batch_size = 500
        for i in range(0, len(records), batch_size):
            # Use list comprehension to avoid Pyre slicing issues
            batch = [records[j] for j in range(i, min(i + batch_size, len(records)))]
            try:
                supabase.table('professionals').insert(batch).execute()
                print(f"✅ Imported batch {i // batch_size + 1}")
            except Exception as e:
                print(f"❌ Error in batch {i // batch_size + 1}: {e}")

if __name__ == "__main__":
    # Example usage:
    # import_institutions('scripts/data/institutions_pilot.csv')
    # import_professionals('scripts/data/professionals_pilot.csv')
    print("🛠️ Data Importer initialized. Call import functions with your CSV paths.")
