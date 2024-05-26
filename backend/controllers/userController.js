const User = require('../models/User');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

const registerUser = async (req, res) => {
    const { username, email, password, role } = req.body;

    try {
        console.log("Registering user:", { username, email, role });

        let user = await User.findOne({ email });
        if (user) {
            console.log("User already exists:", email);
            return res.status(400).json({ msg: 'User already exists' });
        }

        user = new User({ username, email, password, role });

        const salt = await bcrypt.genSalt(10);
        user.password = await bcrypt.hash(password, salt);

        console.log("Saving user to database...");
        await user.save();
        console.log("User saved:", user);

        const payload = { user: { id: user.id } };

        jwt.sign(payload, process.env.JWT_SECRET, { expiresIn: 360000 }, (err, token) => {
            if (err) {
                console.error("JWT error:", err.message);
                throw err;
            }
            console.log("JWT token generated");
            res.json({ token });
        });

    } catch (err) {
        console.error("Error in registerUser:", err.message);
        res.status(500).send('Server error');
    }
};

// Login User
const loginUser = async (req, res) => {
    const { email, password } = req.body;

    try {
        let user = await User.findOne({ email });

        if (!user) {
            return res.status(400).json({ msg: 'Invalid Credentials' });
        }

        const isMatch = await bcrypt.compare(password, user.password);

        if (!isMatch) {
            return res.status(400).json({ msg: 'Invalid Credentials' });
        }

        const payload = {
            user: {
                id: user.id
            }
        };

        jwt.sign(payload, process.env.JWT_SECRET, {
            expiresIn: 360000
        }, (err, token) => {
            if (err) throw err;
            res.json({ token });
        });

    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server error');
    }
};

module.exports = { registerUser, loginUser };
