module.exports = (sequelize, DataTypes) => {
  const Channel = sequelize.define(
    'channel',
    {
      id: {
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
        primaryKey: true,
      },
      name: {
        type: DataTypes.STRING,
        allowNull: false,
      },
    },
    {
      timestamps: false,
    }
  );

  Channel.associate = (models) => {
    Channel.belongsToMany(models.User, {
      through: 'User_Channel',
      as: 'participants',
    });
    Channel.belongsToMany(models.User, {
      through: 'Channel_Admin',
      as: 'admins',
    });
    Channel.hasMany(models.Message, { onDelete: 'CASCADE' });
    Channel.belongsTo(models.Team);
    Channel.belongsTo(models.Hackathon);
  };

  return Channel;
};
