const jwt = require('jsonwebtoken');

const { BlogPost, Category } = require('../models');
const { User } = require('../models');

const getAll = async () => {
    const allPostsByOwner = await BlogPost.findAll({
        include: [{
            model: User,
            as: 'user',
            attributes: { exclude: ['password'] },
        }, {
            model: Category,
            as: 'categories',
            through: { attributes: [] },
        }],
    });

    return allPostsByOwner;
};

const getPostById = async (id) => {
    const postByOwnerId = await BlogPost.findByPk(id, {
        include: [{
            model: User,
            as: 'user',
            attributes: { exclude: ['password'] },
        }, {
            model: Category,
            as: 'categories',
            through: { attributes: [] },
        }],
    });

    return postByOwnerId;
};

// const createPost = async ({ title, content, categoryIds }) => {
    
//     const userId = 1;
//     const newPost = await BlogPost.create({ userId, title, content });
    
//     // await PostCategory.bulkCreate(categoryIds);
    
//     return newPost;
// };

const updatePost = async (id, { title, content }, token) => {
    const authorizedUser = await BlogPost.findByPk(id);
    const { userId } = authorizedUser.dataValues;
    const { email } = await jwt.decode(token);
    const owner = await User.findOne({ where: { email } });
    if (userId !== owner.dataValues.id) {
        return false;
    }
    await BlogPost.update({ title, content }, { where: { id } });
    const result = await BlogPost.findByPk(id, {
        include: [{ model: User,
            as: 'user',
            attributes: { exclude: ['password'] },
        }, { model: Category, 
            as: 'categories',
            through: { attributes: [] },
        }],
    });
    return result;
};

module.exports = {
    getAll,
    getPostById,
    updatePost,
};