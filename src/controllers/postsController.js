const { postsService } = require('../services');

const create = async (req, res) => {
    const { title, content, categoryIds } = req.body;
   
    const newPost = await postsService.createPost({ title, content, categoryIds });

    return res.status(200).json(newPost);
};

const getAll = async (_req, res) => {
    const allPosts = await postsService.getAll();

    return res.status(200).json(allPosts);
};

const getPostByOwnerId = async (req, res) => {
    const { id } = req.params;

    const allPostsByOwnerId = await postsService.getPostById(id);

    if (!allPostsByOwnerId) {
        return res.status(404).json({ message: 'Post does not exist' });
    }

    return res.status(200).json(allPostsByOwnerId);
};

module.exports = {
    create,
    getAll,
    getPostByOwnerId,
};
