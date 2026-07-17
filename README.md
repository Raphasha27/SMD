# Sumbandila Municipal Dashboard (SMD)

Municipal infrastructure monitoring dashboard with a React Native mobile app and FastAPI Python backend.

## Tech Stack

- **Mobile:** React Native (Expo), React Navigation, Firebase
- **Backend:** FastAPI (Python), Pydantic, Uvicorn
- **API Layer:** Express.js (Node.js) with data adapters
- **Web:** HTML dashboard frontend

## Features

- Municipal infrastructure issue reporting and tracking
- Real-time data ingestion via Express.js adapters
- Integration with SAQA, HPCSA, and university data sources
- Cross-platform mobile and web access
- Pilot launch automation scripts

## Getting Started

```bash
git clone https://github.com/Raphasha27/SMD.git
cd SMD
# Backend
pip install -r requirements.txt && uvicorn main:app --reload
# Mobile
npm install && npx expo start
```

## License

MIT
