const Event = require('../models/event');

// Create Event
const createEvent = async (req, res) => {
    const { name, description, date, organizer } = req.body;

    try {
        const event = new Event({
            name,
            description,
            date,
            organizer
        });

        await event.save();
        res.json(event);
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server error');
    }
};

// Get Events
const getEvents = async (req, res) => {
    try {
        const events = await Event.find().populate('organizer', ['username']);
        res.json(events);
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server error');
    }
};

module.exports = { createEvent, getEvents };
