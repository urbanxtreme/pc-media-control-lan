# HVH SyncPlay  
**Unified Remote & Synchronized Media Control System**  

HVH SyncPlay is a seamless media control and synchronization solution that allows users to remotely control media playback on a PC from any device (smartphone, tablet, or another PC) while ensuring perfectly synchronized playback across multiple devices.  

## Features ✨  
- **Remote Media Control**: Play, pause, stop, and navigate media files on a PC from a web or mobile interface.  
- **Perfect Synchronization**: All connected devices stay in sync, eliminating lag and buffering.  
- **LAN-Based Connectivity**: Privacy-focused, efficient, and internet-independent.  
- **Multi-Device Support**: Compatible with PCs, smartphones, tablets, and smart TVs on the same network.  
- **Minimal Setup**: Simple installation and intuitive web interface.  
- **Future-Proof Design**: Actively evolving to merge `pc-media-control-lan` and `sync-media-player` into a unified system.  

## Future Plans 🚀  
- Merge `pc-media-control-lan` and `sync-media-player` into a single streamlined system.  
- Expand device compatibility (e.g., smart TVs).  
- Develop a mobile-friendly UI for enhanced control.  

## Team 👥  
- HAVIS V H  
- ATHUL A S  
- SREEHARI S  
- SWAROOP SURESH  

## How It Works? ⚙️  
The system comprises two Node.js projects:  
1. **`pc-media-control-lan`**:  
   - A Node.js server runs on the host PC, listening for HTTP control commands (play, pause, stop) from other devices.  
   - Executes commands on the PC’s media player.  
2. **`sync-media-player`**:  
   - A WebSocket server broadcasts time updates to keep all clients in sync.  
   - Clients play media locally while maintaining synchronization.  

*Goal*: Merge both projects into a unified system for remote control and synchronized playback over LAN.  

## Technologies Used 💻  
- HTML5  
- CSS3  
- JavaScript  
- Express.js  
- Socket.IO  
- PM2  
- Robot.js  

## Getting Started 🛠️  

### Prerequisites  
- Node.js installed on the host PC.  

### Installation  

#### For `pc-media-control-lan`:  
1. Navigate to the project folder:  
   ```bash  
   cd pc-media-control-lan  
2. Install dependencies:
    ```bash
    npm install
3. Start the server:
   ```bash
   npm start
4. Note your PC’s local IP (e.g., 192.168.1.18).

#### For `pc-media-control-lan`:  
1. Navigate to the project folder:
    ```bash
    cd sync-media-player  
2. Install dependencies:
    ```bash
    npm install
4. Start the sync server:
    ```bash
    npm start

## Usage 📲  

### Controlling Media (`pc-media-control-lan`)  
1. Access the web/mobile interface on another device.  
2. Send HTTP commands (play, pause, stop) to the host IP.  

### Synchronizing Playback (`sync-media-player`)  
1. Ensure all devices run the client script.  
2. Play media on the host—clients will sync automatically via WebSocket.  

---

**HVH SyncPlay** eliminates the need for multiple tools, offering a privacy-focused, high-performance, and user-friendly media control solution.  
