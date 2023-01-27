const { categoriesService } = require('../services');

const create = async (req, res) => {
    const { name } = req.body;

    const newCategory = await categoriesService.createCategory({ name });
    
    const { id } = newCategory;

    return res.status(201).json({ id, name });
};

module.exports = {
    create,
};