@echo off
echo ==============================================
echo   Starting Nexus Nook Marketplace Dev Server
echo ==============================================
echo   Opening: http://localhost:5173/
echo ==============================================
start http://localhost:5173/
npm run dev -- --host 127.0.0.1 --port 5173
pause
