# pc-media-control
Control PC Media over LAN and sockets
## Project Structure

```
media-controller/
├── server.js
└── public/
    └── index.html
```

## Installation

Install the required packages:

```bash
npm install express socket.io robotjs
```

## Usage

Start the server:

```bash
node server.js
```

To run the server in the background as a pm2 process:

```bash
pm2 start server.js
```

//Visit `http://<your-PC-IP>:3000` or scan the QR code from your phone browser (as shown in the IP display on the page).