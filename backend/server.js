const path = require('path');
require('dotenv').config({ path: path.join(__dirname, '.env') });
const { OAuth2Client } = require('google-auth-library');
const client = new OAuth2Client(process.env.GOOGLE_CLIENT_ID);
const dns = require('dns')
dns.setServers([
  '1.1.1.1',
  '8.8.8.8'
])

const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');

const app = express();
app.use(cors({
  origin: [
    "http://localhost:5173",
    "https://ai-fit-tracker-three.vercel.app"
  ],
  credentials: true
}));
app.use(express.json());

const PORT = process.env.PORT || 5000;
const MONGO_URI = process.env.MONGO_URI;
const JWT_SECRET = process.env.JWT_SECRET || 'fallback_secret_key';

// DB State Logging Middleware
app.use((req, res, next) => {
  const states = ['disconnected', 'connected', 'connecting', 'disconnecting'];
  console.log(`[DB STATUS] ${states[mongoose.connection.readyState]} - ${req.method} ${req.url}`);
  next();
});

// Connect to MongoDB
if (MONGO_URI) {
  mongoose.set('bufferCommands', false); // Fail fast if DB is not connected
  
  const connectWithRetry = () => {
    console.log('Attempting to connect to MongoDB...');
    mongoose.connect(MONGO_URI, {
      serverSelectionTimeoutMS: 5000, // Timeout after 5s instead of 30s
      socketTimeoutMS: 45000,
    })
    .then(() => console.log('Connected to MongoDB'))
    .catch(err => {
      console.error('MongoDB connection error:', err.message);
      console.log('Retrying in 5 seconds...');
      setTimeout(connectWithRetry, 5000);
    });
  };
  
  connectWithRetry();
} else {
  if (process.env.NODE_ENV === 'production') {
    console.error('FATAL: MONGO_URI is missing in .env for production environment. Server will fail.');
    process.exit(1);
  }
  console.log('MONGO_URI not found in .env. Skipping MongoDB connection for now.');
}

app.get("/", (req, res) => {
  res.send("FitTracker API running");
});

// Import Routes
const authRouter = require('./routes/auth');
console.log('Auth Router loaded:', typeof authRouter === 'function');
const activitiesRouter = require('./routes/activities');
const aiRouter = require('./routes/ai');

// Basic health check route
app.get('/api/health', (req, res) => {
  res.json({ status: 'ok', message: 'FitTracker API is running' });
});

// Using Routes
app.use('/api/auth', authRouter);
app.use('/api/activities', activitiesRouter);
app.use('/api/ai', aiRouter);

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});

module.exports = app;
