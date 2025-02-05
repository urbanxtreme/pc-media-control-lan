const express = require('express');
const path = require('path');
const http = require('http');
const socketIo = require('socket.io');
const robot = require('robotjs');
const os = require('os');
const readline = require('readline');

const app = express();
const server = http.createServer(app);
const io = socketIo(server);

// List of available network interfaces
function getLocalIP() {
  const interfaces = os.networkInterfaces();
  const availableInterfaces = [];

  // Collect IPv4 interfaces
  for (const iface in interfaces) {
    for (const details of interfaces[iface]) {
      if (details.family === 'IPv4' && !details.internal) {
        availableInterfaces.push({ name: iface, address: details.address });
      }
    }
  }

  if (availableInterfaces.length === 0) {
    console.log('No valid network interfaces found.');
    return 'localhost';
  }

  // Display list for user to choose from
  console.log('Available Network Interfaces:');
  availableInterfaces.forEach((iface, index) => {
    console.log(`${index + 1}. ${iface.name} - ${iface.address}`);
  });

  const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout,
  });

  // Prompt user to select an interface
  rl.question('Select an interface by number: ', (input) => {
    const choice = parseInt(input, 10) - 1;
    if (choice >= 0 && choice < availableInterfaces.length) {
      const localIP = availableInterfaces[choice].address;
      console.log(`Selected IP: ${localIP}`);
      rl.close();
      startServer(localIP); // Start server with selected IP
    } else {
      console.log('Invalid choice. Exiting.');
      rl.close();
    }
  });
}

// Start the server
function startServer(localIP) {
  // Serve the static files
  app.use(express.static(path.join(__dirname, 'public')));

  app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'index.html'));
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

  // Endpoint to fetch local IP
  app.get('/ipinfo', (req, res) => {
    res.send(localIP);
  });

  // Start the server
  server.listen(3000, () => {
    console.log(`Server running at http://${localIP}:3000`);
  });
}

// Initialize the selection and server start
getLocalIP();
