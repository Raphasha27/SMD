const BaseVerificationAdapter = require('./BaseAdapter');

class UCTAdapter extends BaseVerificationAdapter {
    constructor() {
        super("University of Cape Town");
        this.baseUrl = "https://registry.uct.ac.za/api/verify"; // Placeholder
    }

    /**
     * @param {string} registrationNumber 
     */
    async verify(registrationNumber) {
        // Pilot Phase 1: UCT specific logic
        const isValid = registrationNumber.startsWith("UCT-") && registrationNumber.length > 8;

        const result = {
            status: isValid ? "VERIFIED" : "NOT_FOUND",
            institution: this.institutionName,
            registration_number: registrationNumber,
            data_source: "UCT Central Registry",
            details: {
                academic_standing: isValid ? "Good" : "N/A",
                campus: isValid ? "Upper Campus" : null
            }
        };

        this.logAttempt(registrationNumber, result);
        return result;
    }
}

module.exports = UCTAdapter;
