# Flag Explorer Setup Guide

Follow these steps to get the Flag Explorer application running:

## Backend Setup

1. Open a terminal and navigate to the backend directory:
   ```
   cd backend
   ```

2. Install dependencies:
   ```
   npm install
   ```

3. Start the backend server:
   ```
   npm run dev
   ```

4. Verify the backend is running by opening http://localhost:3000 in your browser. You should see a JSON response.

5. Test the API endpoints:
   ```
   npm run test-api
   ```

## Frontend Setup

1. Open a new terminal and navigate to the frontend directory:
   ```
   cd frontend
   ```

2. Install dependencies:
   ```
   npm install
   ```

3. Start the frontend development server:
   ```
   npm run dev
   ```

4. Open http://localhost:5173 in your browser to view the application.

## Troubleshooting

If you encounter issues:

1. Make sure both backend and frontend servers are running
2. Check the browser console for errors
3. Check the terminal output for server errors
4. Verify that the backend API is accessible at http://localhost:3000/countries
5. Ensure CORS is properly configured in the backend