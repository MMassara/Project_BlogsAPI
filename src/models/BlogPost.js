module.exports = (sequelize, DataTypes) => {
    const BlogPost = sequelize.define('BlogPost', {
        id: {
            type: DataTypes.INTEGER, 
            primaryKey: true,
            autoIncrement:true,
            allowNull: false,
        },
        title: {
            type: DataTypes.STRING,
            allowNull: false, 
        }, 
        content: {
            type: DataTypes.STRING,
            allowNull: false, 
        },
        userId: {
            type: DataTypes.STRING,
            allowNull: false, 
        },
        published: {
            type: DataTypes.DATE,
            allowNull: false,  
        },
        updated: {
            allowNull: false,
            type: DataTypes.DATE
        }
    }, 
    {
        timestamps: false,
        tableName:'blog_posts',
        underscored: true,
    });

    BlogPost.associate = (models) => {
        BlogPost.belongsTo(models.User, {
            foreignKey: 'id',
            as: 'users',
        });
    };

    return BlogPost;
}