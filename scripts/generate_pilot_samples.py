import csv
import os
import random

def generate_pilot_data():
    """
    Generates realistic pilot data for UP and UCT to simulate live registries.
    """
    os.makedirs('scripts/data', exist_ok=True)
    
    # 1. UP Pilot Data (Education)
    up_data = [
        {"name": "University of Pretoria", "type": "university", "registration_number": f"UP-2024-{i:04d}", "accredited": "True", "location": "Pretoria"}
        for i in range(1, 101)
    ]
    
    with open('scripts/data/institutions_up.csv', 'w', newline='', encoding='utf-8') as f:
        writer = csv.DictWriter(f, fieldnames=up_data[0].keys())
        writer.writeheader()
        writer.writerows(up_data)
        
    # 2. UCT Pilot Data (Education)
    uct_data = [
        {"name": "University of Cape Town", "type": "university", "registration_number": f"UCT-2024-{i:04d}", "accredited": "True", "location": "Cape Town"}
        for i in range(1, 101)
    ]
    
    with open('scripts/data/institutions_uct.csv', 'w', newline='', encoding='utf-8') as f:
        writer = csv.DictWriter(f, fieldnames=uct_data[0].keys())
        writer.writeheader()
        writer.writerows(uct_data)

    print("✅ Generated pilot data CSVs in scripts/data/")
    print("📍 scripts/data/institutions_up.csv")
    print("📍 scripts/data/institutions_uct.csv")

if __name__ == "__main__":
    generate_pilot_data()
