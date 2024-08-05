const Event = require('../models/event');
const Registration = require('../models/registration');

// Create Event
const createEvent = async (req, res) => {
    const { name, description, date, venue, contact, prizepool } = req.body;

    try {
        if (!name || !description || !date || !venue || !contact || !prizepool) {
            return res.status(400).json({ msg: 'All fields are required' });
        }

        const event = new Event({
            name,
            description,
            date,
            venue,
            contact,
            prizepool,
            organizer: req.user.id  // Link event to the user creating it
        });

        await event.save();
        res.status(201).json({ message: 'Event created successfully', event });
    } catch (err) {
        console.error('Error creating event:', err.message);
        res.status(500).json({ message: 'Server error', error: err.message });
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
    const { id } = req.params;
    const { email, contactNumber, teamName, teamMemberCount, address } = req.body;
    const userId = req.user.id;  // Ensure `req.user` has the correct ID property

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
            userId
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
    const { userId } = req.params;

    if (!userId) {
        return res.status(400).json({ msg: 'User ID is required' });
    }

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

module.exports = {
    createEvent,
    getEvents,
    registerEvent,
    getRegisteredEventsForPlayer
};
