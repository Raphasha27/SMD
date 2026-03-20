require('dotenv').config();
const express = require('express');
const cors = require('cors');
const { createClient } = require('@supabase/supabase-js');

const UPAdapter = require('./adapters/UPAdapter');
const UCTAdapter = require('./adapters/UCTAdapter');
const SAQAAdapter = require('./adapters/SAQAAdapter');
const HPCSAAdapter = require('./adapters/HPCSAAdapter');
const LPCAdapter = require('./adapters/LPCAdapter');

const app = express();
const PORT = process.env.PORT || 8000;

// Middleware
app.use(cors());
app.use(express.json());

// Supabase Client Initialization
const supabaseUrl = process.env.SUPABASE_URL || '';
const supabaseKey = process.env.SUPABASE_SERVICE_ROLE_KEY || '';

let supabase = null;
if (!supabaseUrl || !supabaseKey || supabaseUrl.includes('your_supabase')) {
    console.warn('⚠️ CRITICAL: SUPABASE_URL or SUPABASE_SERVICE_ROLE_KEY is missing or invalid.');
} else {
    try {
        supabase = createClient(supabaseUrl, supabaseKey);
        console.log('✅ Supabase Logic Engine: Connection Established');
    } catch (error) {
        console.error(`❌ Supabase Connection Failed: ${error.message}`);
    }
}

// Institutional Adapters
const adapters = {
    up: new UPAdapter(),
    uct: new UCTAdapter(),
    saqa: new SAQAAdapter(),
    hpcsa: new HPCSAAdapter(),
    lpc: new LPCAdapter()
};

// Rate Limiting & Proxy Security
const rateLimits = new Map();
const ipVelocity = new Map();

// Authentication Middleware
const authenticateJWT = async (req, res, next) => {
    const authHeader = req.headers.authorization;
    if (!authHeader) {
        return res.status(401).json({ detail: "Missing Authorization Header" });
    }

    const token = authHeader.replace("Bearer ", "");
    try {
        if (!supabase) {
            return res.status(503).json({ detail: "Supabase not configured on backend" });
        }

        const { data: { user }, error } = await supabase.auth.getUser(token);
        if (error || !user) {
            return res.status(401).json({ detail: "Invalid or expired session" });
        }

        req.user = user;
        next();
    } catch (error) {
        return res.status(401).json({ detail: `Authentication Failure: ${error.message}` });
    }
};

// --- Routes ---

/**
 * Health Check
 */
app.get('/', (req, res) => {
    res.json({
        status: "online",
        platform: "Sumbandila DPVI",
        phase: 4,
        security: "JWT_ENABLED"
    });
});

/**
 * Fraud Detection Logic
 */
app.post('/fraud/detect', async (req, res) => {
    const { user_id } = req.body || req.query; // Support both for flexibility
    if (!user_id) return res.status(400).json({ error: "user_id is required" });

    try {
        if (!supabase) {
            return res.json({ user_id, fraud_score: 0.0, recommendation: "LOGIC_BYPASSED" });
        }

        const { data: history, error } = await supabase
            .from('verifications')
            .select('status')
            .eq('user_id', user_id)
            .order('created_at', { ascending: false })
            .limit(50);

        if (error) throw error;

        if (!history || history.length === 0) {
            return res.json({ user_id, fraud_score: 0.0, recommendation: "LOW_RISK" });
        }

        const failedCount = history.filter(v => v.status === "NOT_FOUND" || v.status === "INVALID_ID_FORMAT").length;
        
        // Anti-Fraud Rule: Consecutive failures penalty (3 fails in a row = +20% score)
        let consecutiveFails = 0;
        for (const v of history.slice(0, 5)) {
            if (v.status !== "VERIFIED") consecutiveFails++;
            else break;
        }

        let fraudScore = failedCount < 10 ? failedCount / 10.0 : 1.0;
        if (consecutiveFails >= 3) fraudScore = Math.min(1.0, fraudScore + 0.2); 

        const recommendation = fraudScore > 0.6 ? "HIGH_RISK" : fraudScore > 0.3 ? "MEDIUM_RISK" : "LOW_RISK";

        res.json({
            user_id,
            fraud_score: parseFloat(fraudScore.toFixed(2)),
            recommendation,
            failed_attempts: failedCount,
            consecutive_fails: consecutiveFails
        });
    } catch (error) {
        res.status(500).json({ detail: `Fraud Check Error: ${error.message}` });
    }
});

/**
 * Core Verification Engine
 */
app.get('/verify/education/:institution', authenticateJWT, async (req, res) => {
    const { institution } = req.params;
    const { reg_number } = req.query;
    const user = req.user;

    if (!reg_number) return res.status(400).json({ error: "reg_number is required" });

    const userId = user.id;
    const ip = req.ip || req.headers['x-forwarded-for'];

    // 🛡️ SECURITY: IP Velocity Check (5 checks/minute)
    const minuteAgo = Date.now() - 60000;
    let ipAttempts = (ipVelocity.get(ip) || []).filter(t => t > minuteAgo);
    if (ipAttempts.length >= 5) {
        return res.status(429).json({ detail: "System-wide suspicious activity detected from your IP. Please wait 60 seconds." });
    }
    ipAttempts.push(Date.now());
    ipVelocity.set(ip, ipAttempts);

    // 🔍 Monetization & Usage Check
    let isPremium = false;
    if (supabase) {
        try {
            const { data: profile } = await supabase
                .from('profiles')
                .select('is_premium')
                .eq('id', userId)
                .single();
            isPremium = profile?.is_premium || false;
        } catch (error) {
            console.warn(`⚠️ Profile fetch error: ${error.message}`);
        }
    }

    // 🚦 Rate Limiting (Free: 3/hr, Premium: 100/hr)
    const now = Date.now();
    let userRequests = rateLimits.get(userId) || [];
    userRequests = userRequests.filter(t => now - t < 3600000);
    
    const limit = isPremium ? 100 : 3;

    if (userRequests.length >= limit) {
        return res.status(429).json({ 
            detail: `Verification limit reached for your ${isPremium ? 'Premium' : 'Free'} account.`,
            is_premium: isPremium,
            upgrade_needed: !isPremium
        });
    }

    userRequests.push(now);
    rateLimits.set(userId, userRequests);

    // 🔍 Verification Logic
    const adapter = adapters[institution.toLowerCase()];
    if (!adapter) {
        return res.status(404).json({ detail: "Institution adapter not found" });
    }

    const result = await adapter.verify(reg_number);

    // 💾 Audit Logging
    if (supabase) {
        try {
            await supabase.from('verifications').insert({
                user_id: userId,
                institution: institution,
                registration_number: reg_number,
                status: result.status || "UNKNOWN",
                payload: result
            });
        } catch (error) {
            console.warn(`⚠️ Audit Log Error: ${error.message}`);
        }
    }
    res.json({
        ...result,
        usage: {
            remaining: limit - userRequests.length,
            limit: limit,
            is_premium: isPremium
        }
    });
});

/**
 * Mock Payment Subscription Endpoint
 */
app.post('/payment/subscribe', authenticateJWT, async (req, res) => {
    const userId = req.user.id;
    const { plan } = req.body;

    if (!supabase) return res.status(503).json({ error: "Supabase not connected" });

    try {
        const { error } = await supabase
            .from('profiles')
            .upsert({ 
                id: userId, 
                is_premium: true, 
                subscription_tier: plan || 'pro',
                updated_at: new Date().toISOString()
            });

        if (error) throw error;

        res.json({ success: true, message: "Subscription activated successfully!" });
    } catch (error) {
        res.status(500).json({ error: `Payment processing failed: ${error.message}` });
    }
});

/**
 * Admin System Stats (Restricted)
 */
app.get('/admin/stats', authenticateJWT, async (req, res) => {
    const userId = req.user.id;
    if (!supabase) return res.status(503).json({ error: "Supabase not connected" });

    try {
        // 🛡️ Check if User is Admin
        const { data: profile } = await supabase
            .from('profiles')
            .select('is_admin')
            .eq('id', userId)
            .single();

        if (!profile?.is_admin) {
            return res.status(403).json({ error: "Access Denied: Admins Only" });
        }

        // 📊 Fetch Global Stats
        const { count: totalVerifs } = await supabase.from('verifications').select('*', { count: 'exact', head: true });
        const { count: premiumUsers } = await supabase.from('profiles').select('*', { count: 'exact', head: true }).eq('is_premium', true);
        
        // Fetch recent "High Risk" attempts
        const { data: alerts } = await supabase
            .from('verifications')
            .select('created_at, institution, registration_number, status')
            .eq('status', 'NOT_FOUND')
            .order('created_at', { ascending: false })
            .limit(5);

        res.json({
            system_status: "Healthy",
            total_verifications: totalVerifs || 0,
            active_premium_users: premiumUsers || 0,
            security_alerts: alerts || []
        });
    } catch (error) {
        res.status(500).json({ error: `Admin fetch failed: ${error.message}` });
    }
});

app.listen(PORT, () => {
    console.log(`🚀 Sumbandila Node.js Backend listening on port ${PORT}`);
});
