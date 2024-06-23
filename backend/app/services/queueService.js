const waitingQueue = []; // Use an array to simulate the queue

function generateRandomString(length) {
  const charset = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
  let randomString = '';

  for (let i = 0; i < length; i++) {
    const randomIndex = Math.floor(Math.random() * charset.length);
    randomString += charset[randomIndex];
  }

  return randomString;
}

const processWaitingQueue = async (io) => {
  console.log('Processing Waiting Queue');

  if (waitingQueue.length < 2) {
    console.log('Not enough users for a match.');
    return;
  }

  const [user1, user2] = waitingQueue.splice(0, 2); // Dequeue the first two users

  const matchId = generateRandomString(6);
  console.log('Match created:', matchId);

  const matchData = { 
    player: user1,
    opponent: user2,
    matchId: matchId 
  };

  io.to(user1).emit('match', {
    turn: user1,
    opponent: user2,
    matchId: matchId 
  });

  io.to(user2).emit('match', {
    turn: user1,
    opponent: user1,
    matchId: matchId 
  });
};

module.exports = {
  addToWaitingQueue: async (data) => {
    waitingQueue.push(data);
    return;
  },
  processWaitingQueue,
};
