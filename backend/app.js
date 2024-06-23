const express = require('express');
const app = express();
const http = require('http');
const server = http.createServer(app);
const port = process.env.PORT || 3000;

const initializeSocket = require('./app/socket/socketHandler');
initializeSocket(server);

app.get('/', (req, res) => {
  res.send('Welcome');
})

server.listen(port, () => {
  console.log(`App listening at http://localhost:${port}`);
});
