module.exports = (sequelize, DataTypes) => {
  const Profile = sequelize.define('profile', {
    id: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      primaryKey: true
    },
    firstName: {
      type: DataTypes.STRING,
      allowNull: false
    },
    lastName: {
      type: DataTypes.STRING,
      allowNull: false
    },
    fullName: {
      type: DataTypes.VIRTUAL,
      get() {
        return `${this.firstName} ${this.lastName}`;
      }
    }
  });

  Profile.associate = (models) => {
    Profile.belongsTo(models.User);
  };

  return Profile;
};
