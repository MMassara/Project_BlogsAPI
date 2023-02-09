const { BlogPost } = require('../models'); 

module.exports = async (req, res, next) => {
    const { id } = req.params;

    const selectedPost = await BlogPost.findByPk(id);

    if (selectedPost === null) {
        return res.status(404).json({ message: 'Post does not exist' });
    }

    return next();
};