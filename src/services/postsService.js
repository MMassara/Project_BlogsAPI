const jwt = require('jsonwebtoken');
const Sequelize = require('sequelize');

const config = require('../config/config');

const env = process.env.NODE_ENV || 'development';

const { Op } = Sequelize;
const sequelize = new Sequelize(config[env]);

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
    const { id } = await jwt.decode(token);

    const owner = await User.findOne({ where: { id } });

    const userId = owner.dataValues.id;
    const t = await sequelize.transaction();
    try {
        const newPost = await BlogPost.create({ title, content, userId }, { transaction: t });

        const postId = newPost.dataValues.id;
        
        await Promise.all(categoryIds.map((categoryId) => PostCategory
        .create({ postId, categoryId }, { transaction: t })));

        await t.commit();
    
        return newPost.dataValues;
    } catch (err) {
        await t.rollback();
    }
};

const updatePost = async (id, { title, content }, token) => {
    const authorizedUser = await BlogPost.findByPk(id);
    const { userId } = authorizedUser.dataValues;
    const user = await jwt.decode(token);
    const ownerId = user.id;
    const owner = await User.findByPk(ownerId);
    if (userId !== owner.dataValues.id) return false;
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

const deletePostById = async (id, token) => {
    const authorizedUser = await BlogPost.findByPk(id);
    
    const { userId } = authorizedUser.dataValues;

    const user = await jwt.decode(token);

    if (userId !== user.id) {
        return false;
    }

    await BlogPost.destroy({
        where: {
            id,
        },
    });

    return true;
};

module.exports = {
    getAll,
    getPostById,
    updatePost,
    createPost,
    getPostByTitle,
    deletePostById,
};