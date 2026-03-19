from .base_adapter import BaseVerificationAdapter
from typing import Any, Dict

class UPAdapter(BaseVerificationAdapter):
    """
    Adapter for the University of Pretoria Verification Registry.
    """
    
    def __init__(self):
        super().__init__("University of Pretoria")
        self.base_url = "https://api.up.ac.za/v1/verify" # Placeholder

    def verify(self, registration_number: str) -> Dict[str, Any]:
        # During the pilot, we might use a mock endpoint or a specific test dataset
        # provided by the UP IT department.
        
        # simulated_response = self.handle_request(f"{self.base_url}/{registration_number}")
        
        # Mock logic for Pilot Phase 1
        is_valid = registration_number.startswith("UP-") and len(registration_number) > 6
        
        result = {
            "status": "VERIFIED" if is_valid else "NOT_FOUND",
            "institution": self.institution_name,
            "registration_number": registration_number,
            "data_source": "UP Student Registry (API)",
            "details": {
                "degree_verified": "Verified" if is_valid else "N/A",
                "grad_year": "2024" if is_valid else None
            }
        }
        
        self.log_attempt(registration_number, result)
        return result
