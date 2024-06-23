const express = require('express');
const app = express();
const http = require('http');
const server = http.createServer(app);
const port = process.env.PORT || 3000;
const cors = require('cors');

const allowedOrigins = ['http://localhost:3000', 'https://tic-tac-toe-neon-mu.vercel.app'];

// Allow all origins (use only for development)
app.use(cors({
  origin: allowedOrigins,
  methods: ["GET", "POST"],
  allowedHeaders: ["Access-Control-Allow-Origin", "Content-Type"],
  credentials: true,
}));

const initializeSocket = require('./app/socket/socketHandler');
initializeSocket(server);

app.get('/', (req, res) => {
  res.send('Welcome');
});

server.listen(port, () => {
  console.log(`App listening at http://localhost:${port}`);
});
