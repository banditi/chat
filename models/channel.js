module.exports = (sequelize, DataTypes) => sequelize.define('Channel', {
    slug: {
        type: DataTypes.STRING
    },
    name: {
        type: DataTypes.STRING
    }
}, {
    freezeTableName: true
});
