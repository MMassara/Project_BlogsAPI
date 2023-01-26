const jwt = require('jsonwebtoken');

const { JWT_SECRET } = process.env;

const sucessLogin = async (req, res) => {
    const payload = {
        email: req.body.email,
    };

    const token = jwt.sign(payload, JWT_SECRET, {});

    res.status(200).json({ token });
};

module.exports = {
    sucessLogin,
};