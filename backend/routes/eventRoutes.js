const express = require('express');
const { createEvent, getEvents, registerEvent } = require('../controllers/eventController');
const router = express.Router();

router.post('/create', createEvent);
router.get('/', getEvents);
router.post('/:id/register',  registerEvent);

module.exports = router;
