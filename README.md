# 🛡️ Sumbandila Pro
**National Verification & Opportunity Platform for South Africa 🇿🇦**

Sumbandila is a high-performance mobile application designed to combat fraud in education, healthcare, and professional services. It provides instant verification of institutions, professionals, and compliance statuses.

## 🚀 App Features
- **Education Verification:** Check university and college accreditation against national registries.
- **Medical & Legal Hub:** Verify HPCSA and Legal Practice Council registrations.
- **Career Hub:** Connect with verified opportunities and accredited training.
- **Business Tools:** Centralized compliance dashboard for SMEs.
- **Verified Digital CV:** Portable, cryptographically trusted profiles.

## 🛠️ Technology Stack
- **Frontend:** React Native (Expo SDK 54) + Reanimated v4 (New Architecture enabled).
- **Backend:** Supabase (Auth, PostgreSQL, Real-time) + FastAPI (Hybrid Logic Engine).
- **Styling:** Premium Vanilla CSS / React Native Stylesheet.
- **AI/ML:** Logic for fraud detection and pattern recognition in registries.

## 📂 Project Structure
- `/src`: Core mobile application code.
- `/web/landing`: Premium landing page for user acquisition.
- `/scripts`: Utilities for data generation and system maintenance.
- `/backend`: FastAPI service (See `backend_plan.md`).

## 🛡️ Admin & Pilot Tools
- **Admin Control Panel:** Access via `navigation.navigate('Admin')` in the developer console or by adding a temporary button in `DashboardScreen`.
- **Trust Center:** Accessible via Profile -> Trust & Compliance.
- **Pilot Mode:** Enabled across all verification screens for Phase 1.

## 🏁 Getting Started
1. **Mobile App:**
   ```powershell
   powershell -ExecutionPolicy Bypass -Command "npx expo start --tunnel"
   ```
2. **Data Generation:**
   ```bash
   python scripts/dataset_generator.py
   ```
3. **Landing Page:** Open `web/landing/index.html` in any browser.

## 💼 Investor & Growth Resources
- [Pitch Deck](file:///C:/Users/nelso/.gemini/antigravity/brain/e7afd4ff-d95b-4887-a085-727b893a729e/pitch_deck.md)
- [Growth Strategy](file:///C:/Users/nelso/.gemini/antigravity/brain/e7afd4ff-d95b-4887-a085-727b893a729e/growth_strategy.md)
- [Pitch Practice](file:///C:/Users/nelso/.gemini/antigravity/brain/e7afd4ff-d95b-4887-a085-727b893a729e/pitch_practice.md)

---
**Built by Kivoc Dynamic Technology**  
*Empowering South Africa through transparency and trust.*
