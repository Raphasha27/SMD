/**
 * Base class for Institutional Verification Adapters.
 * Ported from Python to Node.js.
 */
class BaseVerificationAdapter {
    constructor(institutionName) {
        this.institutionName = institutionName;
        this.apiKey = process.env[`${institutionName.toUpperCase().replace(/\s+/g, '_')}_API_KEY`] || "";
    }

    /**
     * @abstract
     * @param {string} registrationNumber 
     */
    async verify(registrationNumber) {
        throw new Error("verify() must be implemented by subclass");
    }

    logAttempt(registrationNumber, result) {
        console.log(`[${this.institutionName}] Verifying ${registrationNumber} -> ${result.status || 'UNKNOWN'}`);
    }
}

module.exports = BaseVerificationAdapter;
