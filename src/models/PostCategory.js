module.exports = (sequelize, DataTypes) => {
    const PostCategory = sequelize.define('PostCategory', {
        postId: {
            type: DataTypes.INTEGER, 
            primaryKey: true,
            allowNull: false,
        },
        categoryId: {
            type: DataTypes.INTEGER,
            allowNull: false,
            primaryKey: true,
        }},
    {
        timestamps: false,
        tableName:'posts_categories',
        underscored: true,
    });

    PostCategory.associate = (models) => {
        models.Category.belongsToMany(models.BlogPost, {
           as: 'blog_post',
           through: PostCategory,
           foreignKey: 'categoryId',
           otherKey: 'postId'
        });

        models.BlogPost.belongsToMany(models.Category, {
            as: 'categories',
            through: PostCategory,
            foreignKey: 'postId',
            otherKey: 'categoryId'
        })
    };

    return PostCategory;
}