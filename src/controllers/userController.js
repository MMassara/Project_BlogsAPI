const jwt = require('jsonwebtoken');
const { userService } = require('../services');

const { JWT_SECRET } = process.env;

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

const removeUserById = async (req, res) => {
    const token = req.headers.authorization;

    const user = jwt.decode(token, JWT_SECRET);

    const { id } = user;
    
    await userService.deleteById(id);

    return res.status(204).end();
};

module.exports = {
    getAll,
    getUserById,
    removeUserById,
};