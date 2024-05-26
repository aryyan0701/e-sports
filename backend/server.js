require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');

const app = express();

// Middleware
app.use(express.json());
app.use(cors());

// Routes
const userRoutes = require('./routes/userRoutes');
app.use('/api/users', userRoutes);

const eventRoutes = require('./routes/eventRoutes');
app.use('/api/events', eventRoutes);

const users = require('./routes/userRoutes'); // Adjust the path as needed
app.use('/api/users', users);


// Import the middleware
const authenticateUser = require('./middlewares/authMiddleware');

// Protected route for the dashboard
app.get('/dashboard', authenticateUser, (req, res) => {
  // Serve the dashboard page only if the user is authenticated
  res.send('Welcome to the dashboard!');
});


// Database connection
const dbURI = `mongodb+srv://aryankadam071:${process.env.MONGODB_PASSWORD}@e-sports-dashboard.dh8k3jk.mongodb.net/`;
mongoose.connect(dbURI)
    .then(() => console.log('MongoDB connected'))
    .catch(err => console.log(err));

// Start server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
