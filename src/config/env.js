/**
 * Sumbandila App — Environment Configuration
 *
 * Reads from process.env (injected via babel-plugin-transform-inline-environment-variables
 * or expo-constants). Never hardcode real keys here — use .env instead.
 *
 * Usage:
 *   import { Config } from '../config/env';
 *   const result = await fetch(Config.API_BASE_URL + '/verify');
 */

export const Config = {
  // Backend
  API_BASE_URL: process.env.API_BASE_URL || 'https://api.sumbandila.co.za/v1',
  API_TIMEOUT_MS: Number(process.env.API_TIMEOUT_MS) || 10000,

  // Verification
  VERIFICATION_API_KEY: process.env.VERIFICATION_API_KEY || '',
  HPCSA_API_KEY: process.env.HPCSA_API_KEY || '',
  LPC_API_KEY: process.env.LPC_API_KEY || '',
  SAQA_API_KEY: process.env.SAQA_API_KEY || '',
  CIPC_API_KEY: process.env.CIPC_API_KEY || '',

  // Auth
  AUTH0_DOMAIN: process.env.AUTH0_DOMAIN || '',
  AUTH0_CLIENT_ID: process.env.AUTH0_CLIENT_ID || '',

  // Payments
  PAYFAST_MERCHANT_ID: process.env.PAYFAST_MERCHANT_ID || '',

  // AI
  OPENAI_API_KEY: process.env.OPENAI_API_KEY || '',
  AI_MODEL: process.env.AI_ASSISTANT_MODEL || 'gpt-4o-mini',

  // App
  APP_ENV: process.env.APP_ENV || 'development',
  IS_DEV: (process.env.APP_ENV || 'development') === 'development',
  DEBUG: process.env.DEBUG_MODE === 'true',
};

/**
 * Runtime check: warn in dev if critical keys are missing.
 * This never throws — the app runs in demo mode without keys.
 */
if (Config.IS_DEV) {
  const REQUIRED_IN_PROD = ['VERIFICATION_API_KEY', 'AUTH0_DOMAIN', 'AUTH0_CLIENT_ID'];
  REQUIRED_IN_PROD.forEach((key) => {
    if (!Config[key]) {
      console.warn(`[Sumbandila] Missing env var: ${key} — running in demo mode.`);
    }
  });
}
