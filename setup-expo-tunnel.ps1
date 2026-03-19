# -----------------------------
# Sumbandila Ultimate Expo + Ngrok Setup
# Auto-detect project path & kill existing tunnels
# -----------------------------

# === 0️⃣ Detect current project path ===
$projectPath = Get-Location
Write-Host "Detected project path: $projectPath" -ForegroundColor Cyan

# === 1️⃣ Check Node.js installation ===
Write-Host "`nChecking Node.js installation..." -ForegroundColor Cyan
if (-not (Get-Command node -ErrorAction SilentlyContinue)) {
    Write-Host "Node.js not found. Please install LTS version from https://nodejs.org/en/download/" -ForegroundColor Red
    exit
} else {
    Write-Host "Node.js found: $(node -v)" -ForegroundColor Green
}

# === 2️⃣ Install/Update Expo CLI globally ===
Write-Host "`nInstalling/Updating Expo CLI..." -ForegroundColor Cyan
npm install -g expo-cli
Write-Host "Expo CLI version: $(expo --version)" -ForegroundColor Green

# === 3️⃣ Install/Update Ngrok globally ===
Write-Host "`nInstalling/Updating Ngrok..." -ForegroundColor Cyan
npm install -g ngrok
Write-Host "Ngrok version: $(ngrok version)" -ForegroundColor Green

# === 4️⃣ Authenticate Ngrok ===
# Replace <YOUR_NGROK_AUTH_TOKEN> with your token from https://dashboard.ngrok.com/get-started/your-authtoken
$ngrokToken = "<YOUR_NGROK_AUTH_TOKEN>"
if ($ngrokToken -eq "<YOUR_NGROK_AUTH_TOKEN>") {
    Write-Host "`n⚠️  Please update this script with your Ngrok Authtoken from https://ngrok.com/ to ensure stability." -ForegroundColor Yellow
} else {
    Write-Host "`nAuthenticating Ngrok..." -ForegroundColor Cyan
    ngrok authtoken $ngrokToken
}

# === 5️⃣ Kill existing Ngrok processes ===
Write-Host "`nChecking for existing Ngrok tunnels..." -ForegroundColor Cyan
$ngrokProcesses = Get-Process ngrok -ErrorAction SilentlyContinue
if ($ngrokProcesses) {
    Write-Host "Killing existing Ngrok processes..." -ForegroundColor Yellow
    $ngrokProcesses | ForEach-Object { Stop-Process -Id $_.Id -Force }
    Start-Sleep -Seconds 2
    Write-Host "Existing Ngrok tunnels killed." -ForegroundColor Green
} else {
    Write-Host "No Ngrok processes found." -ForegroundColor Gray
}

# === 6️⃣ Allow Firewall access for Node + Ngrok ===
Write-Host "`nConfiguring Windows Firewall..." -ForegroundColor Cyan
$apps = @("node.exe", "ngrok.exe")
foreach ($app in $apps) {
    $rule = Get-NetFirewallRule -DisplayName $app -ErrorAction SilentlyContinue
    if (-not $rule) {
        # Attempt to find the full path using Get-Command
        $path = (Get-Command $app -ErrorAction SilentlyContinue).Source
        if (-not $path) {
            # Fallback to common paths
            $path = "$env:ProgramFiles\nodejs\$app"
            if (-not (Test-Path $path)) { $path = "$env:ProgramFiles (x86)\nodejs\$app" }
        }
        
        if (Test-Path $path) {
            New-NetFirewallRule -DisplayName $app -Direction Inbound -Program $path -Action Allow -Profile Any
            Write-Host "Firewall rule added for $app ($path)" -ForegroundColor Green
        }
    } else {
        Write-Host "Firewall rule already exists for $app" -ForegroundColor Gray
    }
}

# === 7️⃣ Clear Expo/Metro Bundler cache ===
Write-Host "`nClearing Expo cache..." -ForegroundColor Cyan
Set-Location $projectPath
npx expo start --clear --non-interactive
Write-Host "Cache cleared." -ForegroundColor Green

# === 8️⃣ Start Expo tunnel in project folder ===
Write-Host "`nStarting Expo tunnel..." -ForegroundColor Cyan
Start-Process powershell -ArgumentList "cd `"$projectPath`"; powershell -ExecutionPolicy Bypass -Command 'npx expo start --tunnel'" -NoNewWindow

Write-Host "`n✅ Ultimate setup complete! Metro Bundler with tunnel should start now." -ForegroundColor Green
Write-Host "Scan the QR code in Expo Go on your phone to run the app." -ForegroundColor Green
