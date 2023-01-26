const { User } = require('../models');

const getAll = async () => {
    const allUsers = await User.findAll();

    return allUsers;
};

module.exports = {
    getAll,
};
