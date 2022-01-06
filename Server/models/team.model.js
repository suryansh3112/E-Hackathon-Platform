module.exports = (sequelize, DataTypes) => {
  const Team = sequelize.define('team', {
    id: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      primaryKey: true
    },
    name: {
      type: DataTypes.STRING,
      unique: true,
      allowNull: false
    }
  });

  Team.associate = (models) => {
    Team.belongsToMany(models.User, { through: 'Teammate', as: 'members' });
    Team.belongsTo(models.User, { foreignKey: 'leaderId', as: 'leader' });
  };

  return Team;
};
