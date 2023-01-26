const { userService } = require('../services');

const getAll = async (_req, res) => {
    const allUsers = await userService.getAll();

    res.status(200).json(allUsers);
};

module.exports = {
    getAll,
};