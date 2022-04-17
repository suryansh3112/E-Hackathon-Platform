module.exports = (sequelize, DataTypes) => {
  const User = sequelize.define(
    'user',
    {
      id: {
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
        primaryKey: true,
      },
      userName: {
        type: DataTypes.STRING,
        unique: true,
        allowNull: false,
      },
      email: {
        type: DataTypes.STRING,
        unique: true,
        allowNull: false,
      },
      password: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      profileCompleted: {
        type: DataTypes.BOOLEAN,
        allowNull: false,
        defaultValue: false,
      },
    },
    {
      timestamps: false,
    }
  );

  User.associate = (models) => {
    User.hasOne(models.Profile);
    User.belongsToMany(models.Team, { through: 'Teammate', as: 'allTeams' });
    User.hasMany(models.Team, { foreignKey: 'leaderId', as: 'createdTeams' });
    User.belongsToMany(models.Channel, {
      through: 'User_Channel',
      as: 'channels',
    });
    User.belongsToMany(models.Channel, {
      through: 'Channel_Admin',
      as: 'adminChannel',
    });
    User.hasMany(models.Message);
    User.hasMany(models.Hackathon, {
      foreignKey: 'organiserId',
      as: 'createdHackathons',
    });
  };

  return User;
};
