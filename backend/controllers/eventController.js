const Event = require('../models/event');
const Registration = require('../models/registration');

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

// Register Event
const registerEvent = async (req, res) => {
    console.log('Request User:', req.user); // assuming req.user contains the logged-in user's data
    const { id } = req.params;
    const { email, contactNumber, teamName, teamMemberCount, address } = req.body;
    const userId = req.user._id; // Get the user ID from req.user

    console.log('Request Body:', req.body);

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
            teamMemberCount,
            address,
            userId // Include userId in the registration
        });

        await registration.save();
        res.json({ msg: 'Registration successful', registration });
    } catch (err) {
        console.error('Error registering for event:', err.message);
        res.status(500).send('Server error');
    }
};

// Get Registered Events for Player
const getRegisteredEventsForPlayer = async (req, res) => {
    const { userId } = req.params; // Get the userId from the request params

    try {
        const registrations = await Registration.find({ userId });
        if (!registrations.length) {
            return res.status(404).json({ msg: 'No registrations found' });
        }

        const eventIds = registrations.map(reg => reg.eventId);
        const events = await Event.find({ _id: { $in: eventIds } });

        res.json(events);
    } catch (err) {
        console.error('Error fetching registered events:', err.message);
        res.status(500).send('Server error');
    }
};

module.exports = { createEvent, getEvents, registerEvent, getRegisteredEventsForPlayer };
