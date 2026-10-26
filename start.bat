@echo off
title Locket Web Client
echo Starting Locket Web Static Server...
cd /d "%~dp0"
start http://localhost:8000
python -m http.server 8000
pause
