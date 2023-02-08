const { User } = require('../models');

const createUser = async ({ displayName, email, password, image }) => {
    const newUser = await User.create({ displayName, email, password, image });

    return newUser.dataValues.id;
};

const loginUser = async (email) => {
    const user = await User.findOne({ where: { email } });

    return user.dataValues.id;
};

module.exports = {
    createUser,
    loginUser,
};
