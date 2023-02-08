const { User } = require('../models');

const getAll = async () => {
    const allUsers = await User.findAll({
        attributes: { exclude: ['password'] } });

    return allUsers;
};

const getUserById = async (id) => {
    const selectedUser = await User.findByPk(id, {
        attributes: { exclude: ['password'] } });

    return selectedUser;
};

const deleteById = async (id) => {
    await User.destroy({
        where: {
            id,
        },
    });

    return true; 
};

module.exports = {
    getAll,
    getUserById,
    deleteById,
};
