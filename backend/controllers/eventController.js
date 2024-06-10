const Event = require('../models/event');
const Registration = require('../models/registration'); // Assuming you have a registration model

// Create Event
const createEvent = async (req, res) => {
    const { name, description, date, contact, prizepool } = req.body;

    try {
        if (!contact) {
            return res.status(400).json({ msg: 'Contact information is required' });
        }

        const event = new Event({
            name,
            description,
            date,
            contact, 
            prizepool
        });

        await event.save();
        res.json(event);
    } catch (err) {
        console.error('Error creating event:', err.message);
        res.status(500).send('Server error');
    }
};

// Get Events
const getEvents = async (req, res) => {
    try {
        const events = await Event.find();
        res.json(events);
    } catch (err) {
        console.error('Error fetching events:', err.message);
        res.status(500).send('Server error');
    }
};

// Register for Event
const registerEvent = async (req, res) => {
    const { id } = req.params;
    const { email, contactNumber, teamName, teamMemberCount } = req.body;

    try {
        const event = await Event.findById(id);
        if (!event) {
            return res.status(404).json({ msg: 'Event not found' });
        }

        const registration = new Registration({
            eventId: id,
            email,
            contactNumber,
            teamName,
            teamMemberCount
        });

        await registration.save();
        res.json({ msg: 'Registration successful', registration });
    } catch (err) {
        console.error('Error registering for event:', err.message);
        res.status(500).send('Server error');
    }
};


module.exports = { createEvent, getEvents, registerEvent };
