const jwt = require('jsonwebtoken');

const { JWT_SECRET } = process.env;
const { loginService } = require('../services');

const sucessLogin = async (req, res) => {
    const { email } = req.body;

    const id = await loginService.loginUser(email);

    const payload = {
        id,
    };

    const token = jwt.sign(payload, JWT_SECRET, {});

    res.status(200).json({ token });
};

const create = async (req, res) => {
    const { displayName, email, password, image } = req.body;

    const id = await loginService.createUser({ displayName, email, password, image });

    const payload = {
        id,
    };

    const token = jwt.sign(payload, JWT_SECRET, {});

    res.status(201).json({ token });
};

module.exports = {
    sucessLogin,
    create,
};