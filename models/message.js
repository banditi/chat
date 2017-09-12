module.exports = (sequelize, DataTypes) => {
    const Message = sequelize.define('Message', {
        timestamp: {
            type: DataTypes.DATE //TIMESTAMP WITH TIME ZONE for postgres
        }
    }, {
        freezeTableName: true
    });

    Message.associate = (model) => {
        Message.belongsTo(model.User, {
            onDelete: 'CASCADE',
            foreignKey: {
                allowNull: false
            }
        });
    };

    return Message;
};
