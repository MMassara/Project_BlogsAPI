const { User } = require('../models');

const createUser = async ({ displayName, email, password, image }) => {
    const newUser = await User.create({ displayName, email, password, image });

    return newUser;
};

module.exports = {
    createUser,
};
