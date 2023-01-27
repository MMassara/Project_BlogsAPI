const { userService } = require('../services');

const getAll = async (_req, res) => {
    const allUsers = await userService.getAll();

    res.status(200).json(allUsers);
};

const getUserById = async (req, res) => {
    const { id } = req.params;

    const selectedUser = await userService.getUserById(id);

    if (!selectedUser) {
        return res.status(404).json({ message: 'User does not exist' });
    } 

    return res.status(200).json(selectedUser);
};

module.exports = {
    getAll,
    getUserById,
};