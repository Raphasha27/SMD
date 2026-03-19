/**
 * Sumbandila App — Secure API Service Layer
 *
 * All network calls go through this module. Secrets are read
 * from Config, never hardcoded. Includes timeout, error handling,
 * and demo-mode fallback when API keys are not set.
 */

import { Config } from '../config/env';
import { supabase } from '../config/supabase';

const DEMO_MODE = !Config.VERIFICATION_API_KEY && !process.env.EXPO_PUBLIC_SUPABASE_URL;

// ─── Generic fetch wrapper ───────────────────────────────────────────────────

async function apiRequest(endpoint, options = {}) {
  const controller = new AbortController();
  const timeout = setTimeout(() => controller.abort(), Config.API_TIMEOUT_MS);

  try {
    const response = await fetch(`${Config.API_BASE_URL}${endpoint}`, {
      ...options,
      headers: {
        'Content-Type': 'application/json',
        'X-API-Key': Config.VERIFICATION_API_KEY,
        'X-App-Version': '1.0.0',
        ...(options.headers || {}),
      },
      signal: controller.signal,
    });

    clearTimeout(timeout);

    if (!response.ok) {
      throw new Error(`API error ${response.status}: ${response.statusText}`);
    }

    return await response.json();
  } catch (err) {
    clearTimeout(timeout);
    if (err.name === 'AbortError') {
      throw new Error('Request timed out. Please check your connection.');
    }
    throw err;
  }
}

// ─── Verification Service ────────────────────────────────────────────────────

/**
 * Verify an institution or professional.
 * In demo mode, returns realistic mock data.
 */
/**
 * Verify an institution or professional.
 * Queries Supabase tables and logs the attempt.
 */
export async function verifyEntity({ type, name, registrationNumber }) {
  if (DEMO_MODE) {
    await new Promise((r) => setTimeout(r, 1200));
    return {
      status: name?.toLowerCase().includes('invalid') ? 'UNABLE_TO_VERIFY' : 'VERIFIED',
      entityName: name,
      entityType: type,
      registrationNumber: registrationNumber || 'DEMO-123456',
      verifiedAt: new Date().toISOString(),
      source: 'Demo Registry',
      details: {
        accreditation: 'Accredited',
        lastUpdated: '2026-03-17',
        authority: type === 'Education' ? 'SAQA / CHE' : type === 'Medical' ? 'HPCSA' : 'LPC',
      },
    };
  }

  try {
    let query;
    let table = type === 'Education' ? 'institutions' : 'professionals';
    
    // 1. Query the live registry
    if (type === 'Education') {
      query = supabase.from('institutions')
        .select('*')
        .or(`name.ilike.%${name}%,registration_number.eq.${registrationNumber}`)
        .single();
    } else {
      query = supabase.from('professionals')
        .select('*')
        .or(`full_name.ilike.%${name}%,registration_number.eq.${registrationNumber}`)
        .single();
    }

    const { data: entityData, error } = await query;

    // 2. Determine verification status
    const status = entityData ? 'VERIFIED' : 'UNABLE_TO_VERIFY';

    // 3. Log the verification attempt (Audit Trail)
    const { data: userData } = await supabase.auth.getUser();
    if (userData?.user) {
      await supabase.from('verifications').insert([{
        user_id: userData.user.id,
        target_id: entityData?.id || 'ANONYMOUS',
        type: type,
        status: status,
        metadata: { searchedName: name, searchedReg: registrationNumber }
      }]);
    }

    if (error && error.code !== 'PGRST116') throw error; // PGRST116 is 'no rows returned'

    return {
      status: status,
      entityName: entityData ? (entityData.name || entityData.full_name) : name,
      entityType: type,
      registrationNumber: entityData?.registration_number || registrationNumber,
      verifiedAt: new Date().toISOString(),
      source: 'Sumbandila National Hub',
      details: {
        accredited: entityData?.accredited || entityData?.is_verified || false,
        location: entityData?.location || 'N/A',
        specialization: entityData?.specialization || 'General',
        authority: type === 'Education' ? 'SAQA' : type === 'Medical' ? 'HPCSA' : 'LPC',
      },
    };
  } catch (err) {
    console.error('Verification Error:', err);
    throw new Error('Verification service temporarily unavailable.');
  }
}

// ─── Grants / Funding ────────────────────────────────────────────────────────

export async function fetchFundingOpportunities() {
  if (DEMO_MODE) {
    return require('../data/mockFunding.json');
  }
  return apiRequest('/funding/opportunities');
}

// ─── Compliance ──────────────────────────────────────────────────────────────

export async function fetchComplianceStatus(entityId) {
  if (DEMO_MODE) {
    return {
      score: 87,
      items: [
        { label: 'CIPC Registration', status: 'valid', expiry: 'Dec 2026' },
        { label: 'Tax Clearance', status: 'expiring', expiry: '14 days' },
        { label: 'BBBEE Certificate', status: 'expiring', expiry: '30 days' },
      ],
    };
  }
  return apiRequest(`/compliance/${entityId}`);
}

// ─── User / Auth ─────────────────────────────────────────────────────────────

export async function loginUser({ email, password }) {
  if (DEMO_MODE) {
    await new Promise((r) => setTimeout(r, 800));
    if (email && password) {
      return { token: 'demo-jwt-token', user: { email, name: 'Demo User', plan: 'Individual Pro' } };
    }
    throw new Error('Invalid credentials');
  }

  // Use Supabase Auth
  const { data, error } = await supabase.auth.signInWithPassword({
    email,
    password,
  });

  if (error) throw error;

  // Log Activity (Non-blocking)
  supabase.from('login_activity').insert([
    {
      user_id: data.user.id,
      logged_at: new Date().toISOString(),
      device_info: 'Mobile App',
    },
  ]).then(({ error: logError }) => {
    if (logError) console.error('Failed to log activity:', logError);
  });

  return { 
    token: data.session?.access_token, 
    user: { 
      id: data.user.id,
      email: data.user.email, 
      name: data.user.user_metadata?.full_name || data.user.email,
      plan: 'Individual Pro' // Default for now
    } 
  };
}
