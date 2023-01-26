const jwt = require('jsonwebtoken');

const { JWT_SECRET } = process.env;
const { loginService } = require('../services');

const sucessLogin = async (req, res) => {
    const payload = {
        email: req.body.email,
    };

    const token = jwt.sign(payload, JWT_SECRET, {});

    res.status(200).json({ token });
};

const create = async (req, res) => {
    const { displayName, email, password, image } = req.body;

    const payload = {
        displayName,
        email,
        password,
        image,
    };

    const token = jwt.sign(payload, JWT_SECRET, {});

    await loginService.createUser({ displayName, email, password, image });

    res.status(201).json({ token });
};

module.exports = {
    sucessLogin,
    create,
};