module.exports = (sequelize, DataTypes) => {
  const Profile = sequelize.define(
    'profile',
    {
      id: {
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
        primaryKey: true,
      },
      firstName: DataTypes.STRING,
      lastName: DataTypes.STRING,
      bio: DataTypes.STRING,
      linkedin_url: DataTypes.STRING,
      github_url: DataTypes.STRING,
      twitter_url: DataTypes.STRING,
      resume_url: DataTypes.STRING,
      image_url: DataTypes.STRING,
      fullName: {
        type: DataTypes.VIRTUAL,
        get() {
          if (this.firstName || this.lastName)
            return `${this.firstName} ${this.lastName}`;
          return '';
        },
      },
    },
    {
      timestamps: false,
    }
  );

  Profile.associate = (models) => {
    Profile.belongsTo(models.User);
  };

  return Profile;
};
