const Event = require('../models/event');

// Create Event
const createEvent = async (req, res) => {
    const { name, description, date, contact } = req.body;

    try {
        if (!contact) {
            return res.status(400).json({ msg: 'Contact information is required' });
        }

        console.log('Creating event with:', { name, description, date, contact });

        const event = new Event({
            name,
            description,
            date,
            contact
        });

        await event.save();
        res.json(event);
    } catch (err) {
        console.error('Error creating event:', err.message);
        res.status(500).send('Server error');
    }
};

module.exports = { createEvent, getEvents };
