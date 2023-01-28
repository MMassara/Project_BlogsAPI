const { postsService } = require('../services');

const create = async (req, res) => {
    const { title, content, categoryIds } = req.body;
   
    const newPost = await postsService.createPost({ title, content, categoryIds });

    return res.status(200).json(newPost);
};

const getAll = async (req, res) => {
    const allPosts = await postsService.getAll();

    return res.status(200).json(allPosts);
};

module.exports = {
    create,
    getAll,
};
