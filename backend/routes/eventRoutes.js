const express = require('express');
const { createEvent, getEvents, registerEvent, getRegisteredEventsForPlayer } = require('../controllers/eventController');
const router = express.Router();

const verifyToken = require('../middleware/authMiddleware'); 

router.post('/create', verifyToken, createEvent);
router.get('/', getEvents);
router.post('/:id/register', verifyToken, registerEvent);
router.get('/player/:userId/registered', verifyToken, getRegisteredEventsForPlayer);

module.exports = router;
