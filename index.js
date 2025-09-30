const express = require('express');
const cors = require('cors');
require('dotenv').config();
const supabase = require('./supabaseClient');

const app = express();
const PORT = process.env.PORT || 5000;
// Middleware
app.use(cors());
app.use(express.json());


// import routes
const authRoutes = require('./routes/auth');
const profilesRoutes = require('./routes/profiles');

// use routes
app.use('/api/auth', authRoutes);
app.use('/api/profiles', profilesRoutes);

// Basic health check route
app.get('/', (req, res) => {
  res.json({ message: 'memvites Backend API is running!' });
});
// Health check endpoint
app.get('/health', (req, res) => {
  res.json({ status: 'OK', timestamp: new Date().toISOString() });
});
// Start server
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});

module.exports = app;
