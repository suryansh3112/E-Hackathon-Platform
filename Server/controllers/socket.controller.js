let userSockets = {}; // userId -> socketId

const setSocket = (userId, socketId) => {
  if (!userId) return;
  userSockets[userId] = socketId;
  // console.log(userSockets);
};

const getSocket = (userId) => {
  // console.log(userSockets);

  return userSockets[userId];
};

const deleteSocket = (userId) => {
  delete userSockets[userId];
  // console.log(userSockets);
};

module.exports = {
  setSocket,
  getSocket,
  deleteSocket,
};
