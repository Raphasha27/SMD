# 🚀 Sumbandila: All-in-One Pilot Launch (Node.js Port)
# ---------------------------------------------
# This script automates:
# 1. Partner dataset generation
# 2. Node.js backend Engine startup
# 3. Vite Frontend (Landing) startup
# 4. Mobile Demo Tunnel startup
# ---------------------------------------------

$projectPath = Get-Location

Write-Host "--- 🎓 Phase 1: Generating Partner Datasets ---" -ForegroundColor Cyan
python scripts/generate_pilot_samples.py

Write-Host "`n--- 🖥️  Phase 2: Starting Node.js Logic Engine ---" -ForegroundColor Cyan
# Start backend in a new window
# Note: npm start runs node index.js
Start-Process powershell -ArgumentList "cd `"$projectPath\backend`"; npm start" -NoNewWindow
Write-Host "Node.js Engine starting on port 8000..." -ForegroundColor Green

Write-Host "`n--- 🌐 Phase 3: Starting Vite Frontend ---" -ForegroundColor Cyan
# Start Vite frontend in a new window
Start-Process powershell -ArgumentList "cd `"$projectPath\frontend`"; npm run dev" -NoNewWindow
Write-Host "Vite Frontend starting on port 5173..." -ForegroundColor Green

Write-Host "`n--- 📱 Phase 4: Launching Mobile Demo Tunnel ---" -ForegroundColor Cyan
Set-ExecutionPolicy Bypass -Scope Process -Force
.\setup-expo-tunnel.ps1

Write-Host "`n✅ ALL SYSTEMS GO!" -ForegroundColor Green
Write-Host "1. Frontend is active at http://localhost:5173"
Write-Host "2. Backend is active at http://localhost:8000"
Write-Host "3. Mobile App (Expo) is tunneled successfully."
Write-Host "4. Partner adapters (UP, UCT, SAQA) are ready for demo."
