const { Server } = require("socket.io");
const { addToWaitingQueue, processWaitingQueue } = require("../services/queueService"); // Add processWaitingQueue function

module.exports = (server) => {
  const io = new Server(server, { cors:
        {
          origin: "*",
          methods: ["GET", "POST"],
          allowedHeaders: ["Access-Control-Allow-Origin"],
        }
  });

  io.on('connection', (socket) => {
    socket.on('disconnect', () => {
      console.log('user disconnected');
    });
    
    socket.on('join', () => {
      console.log("Added to Wait Queue.");
      addToWaitingQueue(socket.id)
      .then(() => {
        // Process the waiting queue to create matches
        processWaitingQueue(io);
      })
      .catch((error) => {
        console.error('Error adding data to the queue:', error);
      });
    });
    
    socket.on('event', (data) => {
      console.log(data);
      socket.broadcast.emit('event', data);
    });

    socket.on('rematch', () => {
      console.log("rematch requested");
      socket.broadcast.emit('rematch', null);
    });
    
    socket.on('reconnect', (socket) => {
      console.log('user reconnected');
    });
  });
};
