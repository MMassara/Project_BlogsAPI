const { BlogPost, Category } = require('../models');
// const { PostCategory } = require('../models');
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

module.exports = {
    getAll,
    getPostById,
};