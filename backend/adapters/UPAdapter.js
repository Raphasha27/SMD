const BaseVerificationAdapter = require('./BaseAdapter');

class UPAdapter extends BaseVerificationAdapter {
    constructor() {
        super("University of Pretoria");
        this.baseUrl = "https://api.up.ac.za/v1/verify"; // Placeholder
    }

    /**
     * @param {string} registrationNumber 
     */
    async verify(registrationNumber) {
        // Pilot Phase 1 mock logic
        const isValid = registrationNumber.startsWith("UP-") && registrationNumber.length > 6;
        
        const result = {
            status: isValid ? "VERIFIED" : "NOT_FOUND",
            institution: this.institutionName,
            registration_number: registrationNumber,
            data_source: "UP Student Registry (API)",
            details: {
                degree_verified: isValid ? "Verified" : "N/A",
                grad_year: isValid ? "2024" : null
            }
        };

        this.logAttempt(registrationNumber, result);
        return result;
    }
}

module.exports = UPAdapter;
