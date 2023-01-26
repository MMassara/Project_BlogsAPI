const { User } = require('../models');

module.exports = async (req, res, next) => {
    const { email, password } = req.body;

    if (!email || !password) {
        return res.status(400).json({ message: 'Some required fields are missing' });
    }

    const verifyEmail = await User.findOne({ where: { email } });
    const verifyPassword = await User.findOne({ where: { password } });

    if (!verifyEmail || !verifyPassword) {
        return res.status(400).json({ message: 'Invalid fields' });
    }
    return next();
};