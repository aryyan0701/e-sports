// routes/protectedRoute.js
const express = require('express');
const router = express.Router();
const authenticateToken = require('../middlewares/authMiddleware');

// Protected route
router.get('/protected', authenticateToken, (req, res) => {
  // Accessible only to authenticated users
  res.json({ message: 'Access granted to protected route' });
});

module.exports = router;
