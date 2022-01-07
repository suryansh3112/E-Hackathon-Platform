module.exports = (sequelize, DataTypes) => {
  const Message = sequelize.define('message', {
    id: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      primaryKey: true
    },
    text: {
      type: DataTypes.STRING,
      unique: true,
      allowNull: false
    }
  });

  Message.associate = (models) => {
    Message.belongsTo(models.Channel, { foreignKey: 'channelId' });
    Message.belongsTo(models.User, { foreignKey: 'userId' });
  };

  return Message;
};
