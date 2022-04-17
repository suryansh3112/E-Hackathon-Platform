module.exports = (sequelize, DataTypes) => {
  const Hackathon_Team = sequelize.define(
    'Hackathon_Team',
    {
      id: {
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
        primaryKey: true,
      },
      status: {
        type: DataTypes.INTEGER,
        allowNull: false,
        defaultValue: 0,
      },
    },
    {
      timestamps: false,
    }
  );

  return Hackathon_Team;
};
