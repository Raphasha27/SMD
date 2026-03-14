/**
 * Sumbandila App — Secure API Service Layer
 *
 * All network calls go through this module. Secrets are read
 * from Config, never hardcoded. Includes timeout, error handling,
 * and demo-mode fallback when API keys are not set.
 */

import { Config } from '../config/env';

const DEMO_MODE = !Config.VERIFICATION_API_KEY;

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
export async function verifyEntity({ type, name, registrationNumber }) {
  if (DEMO_MODE) {
    // Demo mode — no real API call
    await new Promise((r) => setTimeout(r, 1500)); // Simulate network delay
    return {
      status: name?.toLowerCase().includes('invalid') ? 'UNABLE_TO_VERIFY' : 'VERIFIED',
      entityName: name,
      entityType: type,
      registrationNumber: registrationNumber || 'DEMO-123456',
      verifiedAt: new Date().toISOString(),
      source: 'Demo Data — Connect API for live verification',
      details: {
        accreditation: 'Accredited',
        lastUpdated: '2026-01-15',
        authority: type === 'Education' ? 'SAQA / CHE' : type === 'Medical' ? 'HPCSA' : 'Legal Practice Council',
      },
    };
  }

  return apiRequest('/verify', {
    method: 'POST',
    body: JSON.stringify({ type, name, registrationNumber }),
  });
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
  return apiRequest('/auth/login', {
    method: 'POST',
    body: JSON.stringify({ email, password }),
  });
}
