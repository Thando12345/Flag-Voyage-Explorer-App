#!/bin/bash

echo "Starting Flag Explorer Development Environment"

echo "Starting Backend API..."
cd backend && npm run dev &
BACKEND_PID=$!

echo "Starting Frontend..."
cd frontend && npm run dev &
FRONTEND_PID=$!

echo "Development servers started!"
echo "Backend: http://localhost:3000"
echo "Frontend: http://localhost:5173"
echo "Press Ctrl+C to stop both servers"

# Wait for user to press Ctrl+C
trap "kill $BACKEND_PID $FRONTEND_PID; exit" INT
wait