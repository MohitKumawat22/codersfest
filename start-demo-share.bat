@echo off
echo ===================================================
echo     APNA SARTHI - LIVE DEMO TUNNEL
echo ===================================================
echo.
echo 1. Ensure 'npm run dev' is running in another tab.
echo 2. Ensure 'ollama serve' is running.
echo 3. Copy the 'Forwarding' URL below (starts with https://)
echo 4. Send that URL to your friend!
echo.
echo Starting Ngrok Tunnel for Port 3000...
echo.
ngrok http 3000
pause
