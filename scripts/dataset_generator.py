import random
import uuid
import csv
import os

def generate_dataset(num_institutions=10000, num_professionals=40000):
    os.makedirs('data_exports', exist_ok=True)
    
    # 1. Generate Institutions
    inst_headers = ['id', 'name', 'type', 'registration_number', 'accredited', 'location']
    inst_types = ['university', 'college', 'private_school']
    provinces = ['Gauteng', 'Western Cape', 'KwaZulu-Natal', 'Eastern Cape', 'Free State', 'Limpopo', 'Mpumalanga', 'North West', 'Northern Cape']
    
    institutions = []
    print(f"Generating {num_institutions} institutions...")
    for i in range(num_institutions):
        institutions.append({
            'id': str(uuid.uuid4()),
            'name': f"{random.choice(['City', 'National', 'Global', 'Apex', 'Summit'])} {random.choice(['Technical', 'Business', 'Arts', 'Science'])} {random.choice(['College', 'Academy', 'Institute'])} {i}",
            'type': random.choice(inst_types),
            'registration_number': f"REG-INST-{i:06d}-{random.choice(['GP', 'WC', 'KZN'])}",
            'accredited': random.random() > 0.1, # 90% accredited
            'location': random.choice(provinces)
        })

    with open('data_exports/institutions.csv', 'w', newline='') as f:
        writer = csv.DictWriter(f, fieldnames=inst_headers)
        writer.writeheader()
        writer.writerows(institutions)

    # 2. Generate Professionals
    prof_headers = ['id', 'full_name', 'profession', 'registration_number', 'is_verified', 'specialization']
    professions = ['doctor', 'lawyer']
    doctor_specialties = ['General Practitioner', 'Cardiologist', 'Pediatrician', 'Neurologist', 'Surgeon']
    lawyer_specialties = ['Commercial Law', 'Criminal Defense', 'Family Law', 'Constitutional Law', 'Labour Law']
    
    professionals = []
    print(f"Generating {num_professionals} professionals...")
    for i in range(num_professionals):
        profession = random.choice(professions)
        professionals.append({
            'id': str(uuid.uuid4()),
            'full_name': f"Dr/Adv {['John', 'Jane', 'Thabo', 'Lerato', 'Sarah', 'Kabelo'][random.randint(0,5)]} {['Smith', 'Molefe', 'Dlamini', 'Naidoo', 'Botha', 'Zuma'][random.randint(0,5)]} {i}",
            'profession': profession,
            'registration_number': f"{'MP' if profession == 'doctor' else 'LPC'}-{i:06d}",
            'is_verified': random.random() > 0.15, # 85% verified
            'specialization': random.choice(doctor_specialties) if profession == 'doctor' else random.choice(lawyer_specialties)
        })

    with open('data_exports/professionals.csv', 'w', newline='') as f:
        writer = csv.DictWriter(f, fieldnames=prof_headers)
        writer.writeheader()
        writer.writerows(professionals)

    print("\n✅ Dataset generation complete!")
    print(f"📍 Files saved in 'data_exports/' directory.")
    print("👉 You can now import these CSVs directly into your Supabase tables.")

if __name__ == "__main__":
    generate_dataset()
