const express = require('express');
const cors = require('cors');
const models = require('./models');
require('dotenv').config();

const app = express();
app.use(express.json());
app.use(cors());

const PORT = process.env.PORT || 5000;

const userRoute = require('./routes/user.route');

app.use('', userRoute);

models.sequelize.sync({ force: true }).then(() => {
  app.listen(PORT, async () => {
    console.log(`The Server has started on port ${PORT}.`);
  });
});
