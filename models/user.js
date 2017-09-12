module.exports = (sequelize, DataTypes) => {
    const User = sequelize.define('User', {
        email: {
            type: DataTypes.STRING
        },
        name: {
            type: DataTypes.STRING
        },
        token: {
            type: DataTypes.STRING
        }
    }, {
        freezeTableName: true
    });

    User.associate = (models) => {
        User.hasMany(models.Message);
    };

    return User;
};
