const { Category } = require('../models'); 

module.exports = async (req, res, next) => {
    const { title, content, categoryIds } = req.body;

    if (!title || !content || !categoryIds) {
        return res.status(400).json({ message: 'Some required fields are missing' });
    }

    const validCategory = await Promise
        .all(categoryIds.map((categoryId) => Category.findByPk(categoryId)));
    console.log('XXXXXXXXXXXXXXXXXXXXXXXX');    
    console.log('VALIDATE:', validCategory);
    console.log('XXXXXXXXXXXXXXXXXXXXXXXX');

    if (validCategory.includes(null)) {
        return res.status(400).json({ message: 'one or more "categoryIds" not found' });
    }

    return next();
};