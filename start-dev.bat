@echo off
echo Starting Flag Explorer Development Environment

echo Starting Backend API...
start cmd /k "cd backend && npm run dev"

echo Starting Frontend...
start cmd /k "cd frontend && npm run dev"

echo Development servers started!
echo Backend: http://localhost:3000
echo Frontend: http://localhost:5173