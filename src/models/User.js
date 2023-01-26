module.exports = (sequelize, DataTypes) => {
    const User = sequelize.define('User', {
        id: {
            type: DataTypes.INTEGER, 
            primaryKey: true,
            autoIncrement:true,
        },
        display_name: DataTypes.STRING, 
        email: DataTypes.STRING,
        password: DataTypes.STRING,
        image: DataTypes.STRING,
    }, {
        timestamps: false,
        underscored: true,
    })

    return User;
}