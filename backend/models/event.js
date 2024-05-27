const mongoose = require('mongoose');

const eventSchema = new mongoose.Schema({
    name: { type: String, required: true },
    description: { type: String, required: true },
    date: { type: Date, required: true },
    contact: { type: String, required: true } // Ensure contact field is present and required
});

module.exports = mongoose.model('Event', eventSchema);
