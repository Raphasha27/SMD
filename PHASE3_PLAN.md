# 🚀 Sumbandila Phase 3: Real-World Connectivity & AI Pattern Analysis

Phase 3 moves the project into the "Monetization & High-Fidelity Data" stage.

## 1. 🏛️ Institutional API Integrations
- [ ] Implement real `requests` logic for `UPAdapter` and `UCTAdapter` using production tokens.
- [ ] Connect with **SAQA (South African Qualifications Authority)** for national validation.
- [ ] Integrate **HPCSA (Health Professions Council of South Africa)** for medical registry checks.

## 2. 🤖 AI Fraud Detection (Logic Engine)
- [ ] Update `backend/main.py` with multi-factor fraud detection logic.
- [ ] Track suspicious verification patterns (e.g., same ID searched multiple times with different names).
- [ ] Implement user behavior modeling for high-risk flags.

## 3. 💳 Payments & Monetization (Premium)
- [ ] Create `SubscriptionScreen.js` integrated with a mock payment gateway.
- [ ] Link successful payments to user profiles in Supabase to enable "Unlimited Verifications".
- [ ] Implement a "Pay-per-check" model for unverified users.

## 4. 🔍 Live Manual Approval Tool
- [ ] Update `AdminScreen.js` to allow admins to "Approve" or "Reject" manual evidence uploads.
- [ ] Notification system to alert users of the manual review outcome (using `expo-notifications`).

## 5. 🏗️ Backend Security (JWT)
- [ ] Transition from API Keys to **Supabase JWT** validation.
- [ ] Secure institutional adapter settings in environment variables.

---
**Phase 3 Start Date:** 2026-03-19  
**Goal:** A pilot-ready application with real-world verification capabilities and a path to revenue.
