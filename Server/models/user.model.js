module.exports = (sequelize, DataTypes) => {
  const User = sequelize.define(
    'user',
    {
      id: {
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
        primaryKey: true
      },
      userName: {
        type: DataTypes.STRING,
        unique: true,
        allowNull: false
      },
      email: {
        type: DataTypes.STRING,
        unique: true,
        allowNull: false
      },
      password: {
        type: DataTypes.STRING,
        allowNull: false
      },
      role: {
        type: DataTypes.STRING,
        allowNull: false,
        defaultValue: 'user'
      }
    },
    {
      timestamps: false
    }
  );

  User.associate = (models) => {
    User.hasOne(models.Profile);
    User.belongsToMany(models.Team, { through: 'Teammate' });
    User.hasMany(models.Team, { foreignKey: 'leaderId' });
    User.belongsToMany(models.Channel, {
      through: 'User_Channel',
      as: 'channels'
    });
    User.belongsToMany(models.Channel, {
      through: 'Channel_Admin',
      as: 'adminChannel'
    });
    User.hasMany(models.Message);
  };

  return User;
};
