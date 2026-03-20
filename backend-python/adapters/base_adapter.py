from abc import ABC, abstractmethod
from typing import Any, Dict, Optional
import requests
import os

class BaseVerificationAdapter(ABC):
    """
    Base class for all institutional verification adapters.
    Ensures a consistent interface for the Sumbandila Logic Engine.
    """
    
    def __init__(self, institution_name: str):
        self.institution_name = institution_name
        self.api_key = os.environ.get(f"{institution_name.upper()}_API_KEY", "")

    @abstractmethod
    def verify(self, registration_number: str) -> Dict[str, Any]:
        """
        Verify a specific registration number against the institution's registry.
        """
        return {}

    def log_attempt(self, registration_number: str, result: Dict[str, Any]):
        """
        Optional: Pre-process logs for institutional reporting.
        """
        print(f"[{self.institution_name}] Verifying {registration_number} -> {result.get('status')}")

    def handle_request(self, url: str, params: Optional[Dict[str, Any]] = None) -> Dict[str, Any]:
        """
        Helper to handle outgoing requests with uniform timeout and error handling.
        """
        request_params = params or {}
        try:
            response = requests.get(
                url, 
                params=request_params, 
                headers={"Authorization": f"Bearer {self.api_key}"} if self.api_key else {},
                timeout=10
            )
            response.raise_for_status()
            return response.json()
        except requests.exceptions.RequestException as e:
            return {"error": str(e), "status": "SYSTEM_TIMEOUT"}
