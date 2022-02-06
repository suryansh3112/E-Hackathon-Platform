const { Sequelize, DataTypes } = require('sequelize');

const sequelize = new Sequelize(
  process.env.DB_NAME,
  process.env.DB_USER_NAME,
  process.env.DB_PASSWORD,
  {
    host: 'localhost',
    dialect: 'postgres',
    logging: false,
  }
);

const models = {
  User: require('./user.model')(sequelize, DataTypes),
  Profile: require('./profile.model')(sequelize, DataTypes),
  Team: require('./team.model')(sequelize, DataTypes),
  Hackathon: require('./hackathon.model')(sequelize, DataTypes),
  Channel: require('./channel.model')(sequelize, DataTypes),
  Message: require('./message.model')(sequelize, DataTypes),
};

Object.keys(models).forEach((modelName) => {
  if ('associate' in models[modelName]) {
    models[modelName].associate(models);
  }
});

models.sequelize = sequelize;
models.Sequelize = Sequelize;

module.exports = models;
