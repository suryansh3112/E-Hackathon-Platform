require('dotenv').config();
const express = require('express');
const cors = require('cors');
const models = require('./models');

const app = express();
app.use(express.json());
app.use(cors());

const PORT = process.env.PORT || 8080;

const userRoute = require('./routes/user.route');
app.use('', userRoute);

const teamRoute = require('./routes/team.route');
app.use('/team', teamRoute);

const channelRoute = require('./routes/channel.route');
app.use('/channel', channelRoute);

const hackathonRoute = require('./routes/hackathon.route');
app.use('/hackathon', hackathonRoute);

app.use('/uploads', express.static('uploads'));

//Utils
const uploadData = require('./routes/uploadData');
app.use('/api', uploadData);

const socketio = require('socket.io');
const http = require('http');
const server = http.createServer(app);

const io = socketio(server, {
  cors: {
    origin: '*', // put frontend url in production
    // credentials: true,
  },
});

require('./sockets')(io);

models.sequelize.sync({ alter: true }).then(() => {
  server.listen(PORT, async () => {
    console.log(`The Server has started on port ${PORT}.`);
  });
});
