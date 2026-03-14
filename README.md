/**
 * Kivoc Dynamic Technology — Sumbandila App
 * Contributor: github.com/KivocDynamicTechnology
 *
 * SECURITY NOTES:
 * - No secrets are stored in this file.
 * - All API keys and credentials must be set via .env (see .env.example).
 * - The app runs in demo mode without API keys; no real data is exposed.
 */

# Sumbandila — National Verification & Opportunity Platform

> **Built by [Kivoc Dynamic Technology](https://github.com/KivocDynamicTechnology)**
> React Native · Expo SDK 54 · South Africa 🇿🇦

---

## 🚀 Quick Start

```bash
# 1. Clone and install
git clone https://github.com/Raphasha27/SDM.git
cd SDM
npm install --legacy-peer-deps

# 2. Set up environment variables
cp .env.example .env
# Edit .env with your real API keys

# 3. Start the bundler
npx expo start          # LAN (same WiFi)
npx expo start --tunnel # Tunnel (anywhere)
npx expo start --android --localhost  # USB debugging
```

## 📱 USB Debugging (Android)

```bash
# Enable USB debugging on your phone, then:
adb reverse tcp:8081 tcp:8081
npx expo start --localhost
# Scan QR code in Expo Go
```

---

## 🏗️ Project Structure

```
SDM/
├── App.js                          # Root navigation (all routes)
├── src/
│   ├── config/env.js               # ✅ Centralized env config (no secrets here)
│   ├── services/api.js             # ✅ Secure API service layer (demo mode included)
│   ├── navigation/MainTabs.js      # Bottom tab navigator
│   ├── theme/colors.js             # Design tokens
│   ├── data/mockFunding.json       # Demo data for offline/dev mode
│   └── screens/
│       ├── SplashScreen.js         # Animated brand splash
│       ├── LoginScreen.js          # Authentication
│       ├── DashboardScreen.js      # Main hub
│       ├── VerificationSelectionScreen.js
│       ├── EducationVerificationScreen.js
│       ├── MedicalVerificationScreen.js
│       ├── LegalVerificationScreen.js
│       ├── VerificationResultScreen.js
│       ├── CareerHubScreen.js     # Talent marketplace
│       ├── BusinessToolsScreen.js  # Tenders, suppliers, compliance, badges
│       ├── AccreditedTrainingScreen.js  # CPD hub
│       ├── MentorshipScreen.js
│       ├── ComplianceScreen.js
│       ├── B2BProcurementScreen.js
│       ├── VendorDirectoryScreen.js
│       ├── SupportHubScreen.js
│       ├── FundingDetailScreen.js  # NEF, IDC, dti + Financial Services
│       ├── ApplicationTrackerScreen.js
│       ├── AISupportScreen.js
│       ├── SubscriptionScreen.js   # R49/mo, R299/mo, Enterprise
│       └── ProfileScreen.js        # Verified CV, CPD tracking
├── .env.example                    # ✅ All required env vars documented
├── .gitignore                      # ✅ Secrets, keys, node_modules excluded
└── package.json                    # Expo SDK 54.0.6
```

---

## 🔐 Security Architecture

| Layer | Implementation |
|---|---|
| Secrets | `.env` file (never committed) |
| API keys | Read via `src/config/env.js` only |
| Verification | Demo mode when keys missing — no data leakage |
| Git protection | `.gitignore` blocks `.env`, `*.pem`, `*.jks`, `google-services.json` |
| Network | All requests via `src/services/api.js` with timeout + abort |

---

## 🏛️ Recommended Backend Architecture

```
Mobile App (Expo SDK 54)
        │
        ▼
 Kong / AWS API Gateway          ← Rate limiting, auth, monitoring
        │
   ┌────┴─────────────────────────────────────────┐
   │              Microservices                    │
   │                                              │
   │  ┌──────────────┐  ┌──────────────────────┐  │
   │  │ Verification │  │ User & Identity (IAM)│  │
   │  │ Microservice │  │ Auth0 / Firebase MFA │  │
   │  └──────┬───────┘  └──────────────────────┘  │
   │         │                                     │
   │  ┌──────┴───────┐  ┌──────────────────────┐  │
   │  │ Procurement  │  │ Payments & Subscription│ │
   │  │ & B2B Tender │  │ PayFast / Peach       │  │
   │  └──────────────┘  └──────────────────────┘  │
   │                                              │
   │  ┌──────────────┐  ┌──────────────────────┐  │
   │  │ Learning/CPD │  │ Financial Services   │  │
   │  │ Marketplace  │  │ Grants & Loans       │  │
   │  └──────────────┘  └──────────────────────┘  │
   └────────────────────────────────────────────────┘
        │                        │
   PostgreSQL                Elasticsearch
   (ACID, RBAC, RLS)         (Talent/Vendor search)
        │
       Redis (cache + job queues)
```

### External Data Partnerships Required
- **Education**: DHET, CHE, Umalusi, SAQA
- **Medical**: HPCSA
- **Legal**: Legal Practice Council (LPC)
- **B2B**: CIPC, SARS, B-BBEE Commission

---

## 💰 Subscription Tiers

| Tier | Price | Key Features |
|---|---|---|
| Free | R0/mo | 5 verifications/day |
| Individual Pro | R49.99/mo | Unlimited, verified CV, CPD tracking |
| Business | R299.99/mo/user | Bulk verify, compliance dashboard, B2B listing |
| Corporate/Enterprise | Custom | Full API, tender management, SLA |

---

## 🤝 Contributors

- **Kivoc Dynamic Technology** — [github.com/KivocDynamicTechnology](https://github.com/KivocDynamicTechnology)
- **Raphasha27** — [github.com/Raphasha27](https://github.com/Raphasha27)

---

## 📋 Roadmap

### Phase 1 — Legal & Data Foundation
- [ ] MoUs with DHET, HPCSA, LPC, CIPC, SARS
- [ ] POPIA compliance audit + Information Officer appointment
- [ ] Secure API integrations with official databases

### Phase 2 — Backend Engineering
- [ ] Microservices API (NestJS/Go)
- [ ] PostgreSQL + Elasticsearch setup
- [ ] PayFast payment integration
- [ ] Auth0 MFA implementation

### Phase 3 — Testing & Launch
- [ ] Internal Alpha testing
- [ ] Beta with university + corporate partners
- [ ] Penetration testing & security audit
- [ ] National launch (Medical first, then Legal, then B2B)

---

*© 2026 Sumbandila · Built by Kivoc Dynamic Technology · POPIA Compliant*
