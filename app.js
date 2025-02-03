const express = require('express');
const http = require('http');
const socketIo = require('socket.io');
const robot = require('robotjs');
const os = require('os');

const app = express();
const server = http.createServer(app);
const io = socketIo(server);

app.use(express.static(__dirname + '/public'));

app.get('/', (req, res) => {
  res.sendFile(__dirname + '/public/index.html');
});

io.on('connection', (socket) => {
  console.log('Client connected');

  socket.on('media-control', (command) => {
    console.log(`Received command: ${command}`);
    handleCommand(command);
  });

  socket.on('disconnect', () => {
    console.log('Client disconnected');
  });
});

function handleCommand(command) {
  switch (command) {
    case 'play':
    case 'pause':
      robot.keyTap('audio_play');
      break;
    case 'next':
      robot.keyTap('audio_next');
      break;
    case 'previous':
      robot.keyTap('audio_prev');
      break;
    default:
      console.log(`Unknown command: ${command}`);
  }
}

function getLocalIP() {
  const interfaces = os.networkInterfaces();
  for (const iface in interfaces) {
    for (const details of interfaces[iface]) {
      if (details.family === 'IPv4' && !details.internal) {
        return details.address;
      }
    }
  }
  return 'localhost';
}

const localIP = getLocalIP();

app.get('/ipinfo', (req, res) => {
  res.send(localIP);
});

server.listen(3000, () => {
  console.log(`Server running at http://${localIP}:3000`);
});
