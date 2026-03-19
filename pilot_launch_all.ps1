# 🚀 Sumbandila: All-in-One Pilot Launch Script
# ---------------------------------------------
# This script automates:
# 1. Pilot data generation
# 2. Institutional data seeding 
# 3. Backend logic engine startup
# 4. Expo tunnel startup
# ---------------------------------------------

$projectPath = Get-Location

Write-Host "--- 🎓 Phase 1: Generating Partner Datasets ---" -ForegroundColor Cyan
python scripts/generate_pilot_samples.py

Write-Host "`n--- 📤 Phase 2: Seeding Live Pilot Registries ---" -ForegroundColor Cyan
# Note: You must ensure SUPABASE_SERVICE_ROLE_KEY is set in your .env
python scripts/data_importer.py

Write-Host "`n--- 🖥️  Phase 3: Starting Hybrid Logic Engine ---" -ForegroundColor Cyan
# Start backend in a new window
Start-Process powershell -ArgumentList "cd `"$projectPath\backend`"; uvicorn main:app --reload --port 8000" -NoNewWindow
Write-Host "FastAPI Engine starting on port 8000..." -ForegroundColor Green

Write-Host "`n--- 📱 Phase 4: Launching Mobile Demo Tunnel ---" -ForegroundColor Cyan
Set-ExecutionPolicy Bypass -Scope Process -Force
.\setup-expo-tunnel.ps1

Write-Host "`n✅ ALL SYSTEMS GO!" -ForegroundColor Green
Write-Host "1. Mobile App is active with 'Pilot Mode' banners."
Write-Host "2. Admin Panel is tracking live verification results."
Write-Host "3. UP and UCT Institutional adapters are ready for demo."
