const express = require('express');
const { createEvent, getEvents } = require('../controllers/eventController');
const router = express.Router();

router.post('/create', createEvent);
router.get('/', getEvents);

module.exports = router;
