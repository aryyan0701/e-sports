const jwt = require('jsonwebtoken');

const verifyToken = (req, res, next) => {
    const token = req.headers['authorization'];
    if (!token) {
        return res.status(401).json({ message: 'No token provided' });
    }

    // Extract token from 'Bearer <token>' format
    const tokenParts = token.split(' ');
    if (tokenParts.length !== 2 || tokenParts[0] !== 'Bearer') {
        return res.status(401).json({ message: 'Invalid token format' });
    }

    try {
        const decoded = jwt.verify(tokenParts[1], process.env.JWT_SECRET);
        req.user = decoded.user;
        next();
    } catch (err) {
        console.error('Token verification error:', err.message);
        return res.status(401).json({ message: 'Invalid token' });
    }
};

module.exports = verifyToken;
