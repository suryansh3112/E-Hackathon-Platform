const jwt = require('jsonwebtoken');
const {
  setSocket,
  getSocket,
  deleteSocket,
} = require('./controllers/socket.controller');
const models = require('./models');

const socketAuth = (socket, next) => {
  try {
    const token = socket.handshake.auth.token;
    if (!token) return;

    const verified = jwt.verify(token, process.env.JWT_SECRET);
    if (!verified) {
      return;
    }
    socket.userId = verified.id;
    next();
  } catch (error) {
    console.log(error);
  }
};

module.exports = (io) => {
  io.use(socketAuth);

  io.on('connection', async (socket) => {
    setSocket(socket.userId, socket.id);
    const user = await models.User.findByPk(socket.userId);

    console.log(user.userName, ' is connected');
    socket.on('sendMessage', async ({ channelId, message }) => {
      const channel = await models.Channel.findByPk(channelId);
      const participants = await channel.getParticipants();
      const receipients = participants.map((user) =>
        getSocket(user.dataValues.id)
      );
      socket.broadcast
        .to(receipients)
        .emit('receiveMessage', { message, by: user.userName });
    });
  });
};
