const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
require('dotenv').config();

const app = express();

// Middleware
app.use(express.json());
app.use(cors());

// Routes
const userRoutes = require('./routes/userRoutes');
app.use('/api/users', userRoutes);

const eventRoutes = require('./routes/eventRoutes');
app.use('/api/events', eventRoutes);

// const dbURI = `mongodb+srv://esports-data:${process.env.MONGODB_PASSWORD}@cluster0.ephobpk.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0`;
// mongoose.connect(dbURI, {
//     useNewUrlParser: true,
//     useUnifiedTopology: true
// }).then(() => {
//     console.log('MongoDB connected');
// }).catch(err => console.log(err));

// Database connection
const dbURI = process.env.MONGO_URI.replace('<password>', process.env.MONGODB_PASSWORD);
mongoose.connect(dbURI, {
    // useNewUrlParser: true, // Remove this line
    // useUnifiedTopology: true, // Remove this line
}).then(() => {
    console.log('MongoDB connected');
}).catch(err => console.log(err));


// Start server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
