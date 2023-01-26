const { User } = require('../models');

function validateEmail(email) {
    const re = /\S+@\S+\.\S+/;
    return re.test(email);
  }

module.exports = async (req, res, next) => {
    const { email } = req.body;

    if (!validateEmail(email)) {
        return res.status(400).json({ message: '"email" must be a valid email' });
    }

    const verifyEmail = await User.findOne({ where: { email } });

    if (verifyEmail) {
        return res.status(409).json({ message: 'User already registered' });
    }

    return next();
};