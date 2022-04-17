module.exports = (sequelize, DataTypes) => {
  const Hackathon = sequelize.define(
    'hackathon',
    {
      id: {
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
        primaryKey: true,
      },
      name: {
        type: DataTypes.STRING,
        unique: true,
        allowNull: false,
      },
      tagLine: {
        type: DataTypes.STRING,
      },
      about: {
        type: DataTypes.STRING,
      },
      website_url: {
        type: DataTypes.STRING,
      },
      minTeamSize: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
      maxTeamSize: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
      applicationStartDate: {
        type: DataTypes.DATE,
        allowNull: false,
      },
      applicationEndDate: {
        type: DataTypes.DATE,
        allowNull: false,
      },
      hackathonStartDate: {
        type: DataTypes.DATE,
        allowNull: false,
      },
      hackathonEndDate: {
        type: DataTypes.DATE,
        allowNull: false,
      },
    },
    {
      timestamps: false,
    }
  );

  Hackathon.associate = (models) => {
    Hackathon.belongsToMany(models.Team, {
      through: models.Hackathon_Team,
    });
    Hackathon.hasOne(models.Channel, { onDelete: 'CASCADE' });
    Hackathon.belongsTo(models.User, {
      foreignKey: 'organiserId',
      as: 'organiser',
    });
  };

  return Hackathon;
};
