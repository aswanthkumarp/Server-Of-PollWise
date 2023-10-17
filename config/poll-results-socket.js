module.exports.poll_result_socket = function (socketServer) {
  let io = require('socket.io')(socketServer, {
    cors: {
      origin: 'http://localhost:5173',
      methods: ['GET', 'POST'],
    },
  });
  io.on('connection', function (socket) {
    // If vote is recorded

    socket.on('voted', (questionID) => {
      socket.broadcast.emit('recordedVote', questionID);
    });
  });
};
