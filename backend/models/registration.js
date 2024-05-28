const mongoose = require('mongoose');

const registrationSchema = new mongoose.Schema({
    eventId: { type: mongoose.Schema.Types.ObjectId, ref: 'Event', required: true },
    email: { type: String, required: true },
    contactNumber: { type: String, required: true },
    teamName: { type: String, required: true },
    teamMemberCount: { type: Number, required: true }
});

module.exports = mongoose.model('Registration', registrationSchema);
