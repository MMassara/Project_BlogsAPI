module.exports = (sequelize, DataTypes) => {
    const User = sequelize.define('User', {
        id: {
            type: DataTypes.INTEGER, 
            primaryKey: true,
            autoIncrement:true,
            allowNull: false,
        },
        displayName: {
            type: DataTypes.STRING,
            allowNull: false, 
        }, 
        email: {
            type: DataTypes.STRING,
            allowNull: false, 
        },
        password: {
            type: DataTypes.STRING,
            allowNull: false, 
        },
        image: {
            type: DataTypes.STRING, 
        },
    }, 
    {
        timestamps: false,
        tableName:'users',
        underscored: true,
    });

    // User.associate = (models) => {
    //     User.hasMany(models.blog_posts, {
    //         foreignKey: 'user_id',
    //         as: 'blog_posts',
    //     });
    // };

    return User;
}