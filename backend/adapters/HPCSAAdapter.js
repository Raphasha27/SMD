const BaseVerificationAdapter = require('./BaseAdapter');

class HPCSAAdapter extends BaseVerificationAdapter {
    constructor() {
        super("HPCSA");
        this.baseUrl = "https://www.hpcsa.co.za/api/v1/search";
    }

    /**
     * @param {string} registrationNumber 
     */
    async verify(registrationNumber) {
        // Mocking HPCSA Medical Practitioner check
        const isValidFormat = /^MP\d{7}$/.test(registrationNumber);
        
        const result = {
            status: isValidFormat ? "VERIFIED" : "NOT_FOUND",
            institution: "Health Professions Council of SA",
            entity: "Medical Practitioner",
            data_source: "HPCSA iReg",
            verified_at: new Date().toISOString(),
            practitioner_data: isValidFormat ? {
                full_name: "Dr. John Doe (Mock)",
                category: "Independent Practice",
                specialty: "General Practitioner",
                registration_date: "2015-06-12",
                good_standing: true
            } : null
        };

        this.logAttempt(registrationNumber, result);
        return result;
    }
}

module.exports = HPCSAAdapter;
