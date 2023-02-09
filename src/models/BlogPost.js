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
        }, 
        content: {
            type: DataTypes.STRING,
        },
        userId: {
            type: DataTypes.STRING,
        },
        published: {
            type: DataTypes.DATE,
            defaultValue: new Date(),  
        },
        updated: {
            type: DataTypes.DATE,
            defaultValue: new Date(),
        }
    }, 
    {
        timestamps: false,
        tableName:'blog_posts',
        underscored: true,
    });

    BlogPost.associate = (models) => {
        BlogPost.belongsTo(models.User, {
            foreignKey: 'user_id',
            as: 'user',
        });
    };

    return BlogPost;
}

