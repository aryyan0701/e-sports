const mongoose = require('mongoose');
const { Schema } = mongoose;

const eventSchema = new mongoose.Schema({
    name: { type: String, required: true },
    description: { type: String, required: true },
    date: { type: Date, required: true },
    venue: { type: String, required: true },
    contact: { type: String, required: true },
    prizepool: { type: String, required: true },
    organizer: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    userEmail: { type: String, required: true }
});

module.exports = mongoose.model('Event', eventSchema);
