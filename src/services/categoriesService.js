const { Category } = require('../models');

const getAll = async () => {
    const allCategories = await Category.findAll();
    
    return allCategories;
};

const createCategory = async ({ name }) => {
    const newCategory = await Category.create({ name });

    return newCategory;
};

module.exports = {
    createCategory,
    getAll,
};