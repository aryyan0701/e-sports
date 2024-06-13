const express = require('express');
const router = express.Router();
const { registerUser, loginUser, upload } = require('../controllers/userController');
const User = require('../models/user');

router.post('/register', upload.single('profileImage'), registerUser);
router.post('/login', loginUser);

// GET all user details
router.get('/all', async (req, res) => {
  try {
    const users = await User.find({});
    res.json(users);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Server Error' });
  }
});

module.exports = router;
