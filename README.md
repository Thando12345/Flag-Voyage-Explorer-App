# Flag Explorer App

A full-stack application for exploring country flags and information from around the world.

## Features

- Browse flags from countries around the world
- Search for countries by name, region, or capital
- View detailed information about each country
- Responsive design that works on mobile, tablet, and desktop
- Real-time search filtering

## Project Structure

```
flag-explorer/
├── backend/                 # Node.js Express API
│   ├── src/                 # Main application code
│   │   ├── controllers/     # Request handlers
│   │   ├── routes/          # API routes
│   │   ├── services/        # Business logic
│   │   └── index.js         # Server entry point
│   ├── tests/               # Unit + integration tests
│   ├── package.json
│   └── Dockerfile
├── frontend/                # Vue 3 + Vite frontend
│   ├── src/                 # Main Vue components and pages
│   │   ├── assets/          # Static assets and global CSS
│   │   ├── components/      # Reusable Vue components
│   │   ├── router/          # Vue Router configuration
│   │   ├── services/        # API services
│   │   ├── views/           # Page components
│   │   ├── App.vue          # Root component
│   │   └── main.js          # Application entry point
│   ├── tests/               # Unit + component tests (Vitest + Vue Test Utils)
│   ├── package.json
│   ├── vite.config.js
│   └── Dockerfile
├── .github/
│   └── workflows/
│       └── pipeline.yml     # CI/CD Pipeline (GitHub Actions)
```

## Setup Instructions

### Prerequisites

- Node.js (v16 or higher)
- npm (v8 or higher)
- Docker (optional, for containerization)

### Backend Setup

```bash
# Navigate to the backend directory
cd backend

# Install dependencies
npm install

# Start the development server
npm run dev
```

The backend API will be available at http://localhost:3000

### Frontend Setup

```bash
# Navigate to the frontend directory
cd frontend

# Install dependencies
npm install

# Start the development server
npm run dev
```

The frontend will be available at http://localhost:5173

### Quick Start (Windows)

You can use the provided batch script to start both servers at once:

```bash
start-dev.bat
```

### Running with Docker

```bash
# Build and run the backend
cd backend
docker build -t flag-explorer-backend .
docker run -p 3000:3000 flag-explorer-backend

# Build and run the frontend
cd frontend
docker build -t flag-explorer-frontend .
docker run -p 8080:80 flag-explorer-frontend
```

## API Documentation

### Endpoints

#### GET /countries

Returns a list of all countries.

**Response:**

```json
[
  {
    "name": "Germany",
    "flag": "https://example.com/germany.png",
    "region": "Europe",
    "population": 83000000,
    "capital": "Berlin"
  },
  {
    "name": "France",
    "flag": "https://example.com/france.svg",
    "region": "Europe",
    "population": 67000000,
    "capital": "Paris"
  }
]
```

#### GET /countries/{name}

Returns detailed information about a specific country.

**Parameters:**

- `name` (path parameter): The name of the country

**Response:**

```json
{
  "name": "Germany",
  "population": 83000000,
  "capital": "Berlin",
  "flag": "https://example.com/germany.png",
  "region": "Europe",
  "languages": ["German"],
  "currencies": ["Euro"],
  "borders": ["AUT", "BEL", "CZE", "DNK", "FRA", "LUX", "NLD", "POL", "CHE"]
}
```

## Testing

### Backend Tests

```bash
cd backend
npm test
```

### Frontend Tests

```bash
cd frontend
npm test
```

## CI/CD Pipeline

The project includes a GitHub Actions workflow that:

1. Runs all backend and frontend tests
2. Builds Docker images for both services
3. Pushes the images to Docker Hub (when merged to main)

To use the CI/CD pipeline, you need to set the following GitHub secrets:

- `DOCKER_HUB_USERNAME`: Your Docker Hub username
- `DOCKER_HUB_TOKEN`: Your Docker Hub access token

## Troubleshooting

If you encounter issues:

1. Make sure both backend and frontend servers are running
2. Check the browser console for errors
3. Check the terminal output for server errors
4. Verify that the backend API is accessible at http://localhost:3000/countries
5. Ensure CORS is properly configured in the backend

## License

MIT