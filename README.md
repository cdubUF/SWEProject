# FitSync

FitSync is a web application designed to help users track and manage their fitness progress. Users can create accounts, log their workouts, and monitor their fitness journey.

## Team Members
- Diego Alvarez de Jesus
- Alex Garcia-Marin
- Brian Mbaji
- Christopher Williams

## Setup Instructions

### Prerequisites
- Node.js and npm must be installed on your machine
- MongoDB Atlas account (for database access)
- Modern web browser (Chrome, Firefox, Safari, etc.)

### First Time Setup
1. Clone the repository
2. Navigate to the root directory
3. Run the following command to install all dependencies and start both servers:
```bash
npm run setup-and-start
```

### After Initial Setup
Once you have completed the first-time setup, for future use you can start both frontend and backend servers together using:
```bash
npm run dev
```

### Individual Commands
If you need to run components separately:
- Install all dependencies: `npm run install-all`
- Start backend only: `npm run backend`
- Start frontend only: `npm run frontend`

## Technical Details

### Port Information
- Frontend runs on: http://localhost:3000
- Backend runs on: http://localhost:5000

### Available Scripts
- `npm run setup-and-start`: Full setup and starts both servers
- `npm run install-all`: Installs dependencies for both frontend and backend
- `npm run dev`: Starts both frontend and backend servers
- `npm run backend`: Starts only the backend server
- `npm run frontend`: Starts only the frontend server

### Features
- User Authentication
    - Sign up with username and password
    - [Future] Login functionality
    - [Future] Password recovery
- [Future] Workout Tracking
- [Future] Progress Monitoring
- [Future] Custom Workout Plans

## Troubleshooting

### Common Issues and Solutions
1. MongoDB Connection Error
    - Check if MongoDB Atlas credentials are correct in .env file
    - Verify network connection
    - Ensure IP address is whitelisted in MongoDB Atlas
2. npm start Fails
    - Try deleting node_modules folder and package-lock.json
    - Run npm install again
    - Clear npm cache using npm cache clean --force
3. Port Already in Use
    - Check if another instance is running
    - Kill the process using the port or change the port number
