module.exports = (sequelize, DataTypes) => {
    const Message = sequelize.define('Message', {
        timestamp: {
            //Timestamp with timezone for Postgres
            type: DataTypes.DATE
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
