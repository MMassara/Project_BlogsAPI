const jwt = require('jsonwebtoken');
const Sequelize = require('sequelize');

const { Op } = Sequelize;

const { BlogPost, Category, PostCategory } = require('../models');
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

const createPost = async ({ title, content, categoryIds }, token) => {
    const { email } = await jwt.decode(token);
    const owner = await User.findOne({ where: { email } });

    const userId = owner.dataValues.id;

    const newPost = await BlogPost.create({ title, content, userId });
    
    await PostCategory.bulkCreate([{
        categoryIds,
    }]);
    
    return newPost.dataValues;
};

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

const getPostByTitle = async (text) => {
    const selectedPost = await BlogPost.findAll({
        where: { [Op.or]: [
                { title: { [Op.like]: `%${text}%` } },
                { content: { [Op.like]: `%${text}%` } },
            ],
        }, 
        include: [{
            model: User,
            as: 'user',
            attributes: { exclude: ['password'] },
        }, {
            model: Category,
            as: 'categories',
            through: { attributes: [] },
        }], 
        attributes: { exclude: ['user_id'] },
    });
    return selectedPost;
};

module.exports = {
    getAll,
    getPostById,
    updatePost,
    createPost,
    getPostByTitle,
};