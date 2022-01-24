let userSockets = {}; // userId -> socketId

const setSocket = (userId, userInfo) => {
  if (!userId) return;
  userSockets[userId] = userInfo;
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
