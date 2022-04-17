const jwt = require('jsonwebtoken');
const {
  setSocket,
  getSocket,
  deleteSocket,
} = require('./controllers/socket.controller');
const models = require('./models');
const { Message, User, Channel, Profile } = models;

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

//roomId->[users]
const videoCallUsers = {};

//userId ->roomId
const socketToRoom = {};

module.exports = (io) => {
  io.use(socketAuth);

  io.on('connection', async (socket) => {
    const user = await User.findOne({
      where: { id: socket.userId },
      include: {
        model: Profile,
        attributes: ['fullName', 'firstName', 'lastName', 'image_url'],
      },
    });
    const profile = user?.profile;
    if (!profile) return;
    const userId = socket.userId;

    setSocket(userId, { fullName: profile.fullName });
    socket.join(userId);
    console.log(user.userName, ' is connected');

    socket.on('sendMessage', async ({ channelId, message }, callback) => {
      try {
        if (!message || !channelId) {
          callback({ success: false, message: 'Incomplete Data' });
          return;
        }

        const newMessage = await Message.create({
          message,
          userId,
          channelId,
        });

        const channel = await Channel.findByPk(channelId);
        const participants = await channel.getParticipants();
        const newparticipants = participants.filter(
          (user) => user.id !== userId
        );

        const response = { ...newMessage.dataValues, user: { profile } };
        newparticipants.forEach((user) => {
          socket.broadcast.to(user.id).emit('receiveMessage', response);
        });
        callback({ success: true, data: response });
      } catch (error) {
        callback({ success: false, message: error.message });
      }
    });

    socket.on('join-video-call', (roomID) => {
      const userObject = {
        id: userId,
        fullName: profile.fullName,
        image_url: profile.image_url,
      };
      if (videoCallUsers[roomID]) {
        // const length = videoCallUsers[roomID].length;
        // if (length === 4) {
        //     socket.emit("room full");
        //     return;
        // }
        videoCallUsers[roomID].push(userObject);
      } else {
        videoCallUsers[roomID] = [userObject];
      }

      socketToRoom[userId] = roomID;
      const usersInThisRoom = videoCallUsers[roomID].filter(
        (obj) => obj.id !== userId
      );
      socket.emit('all-users', usersInThisRoom);
    });

    socket.on('sending-signal', (payload) => {
      io.to(payload.userToSignal).emit('user-joined', {
        signal: payload.signal,
        callerID: payload.callerID,
        userInfo: payload.userInfo,
      });
    });

    socket.on('returning-signal', (payload) => {
      io.to(payload.callerID).emit('receiving-returned-signal', {
        signal: payload.signal,
        id: userId,
      });
    });

    socket.on('disconnect-video-call', () => {
      console.log(socketToRoom, userId);
      const roomID = socketToRoom[userId];
      let room = videoCallUsers[roomID];
      console.log(room);
      if (room) {
        room = room.filter((obj) => obj.id !== userId);
        videoCallUsers[roomID] = room;
      }
      console.log(room);
      room?.forEach((currentUser) => {
        socket.broadcast.to(currentUser.id).emit('user-left', userId);
      });
    });
  });
};
