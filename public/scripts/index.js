const socket = io();

function sendCommand(command) {
  socket.emit("media-control", command);
}

<<<<<<< HEAD
// Add these event listeners to your existing script
const volumeSlider = document.getElementById("volumeSlider");
const brightnessSlider = document.getElementById("brightnessSlider");

// Volume Slider
volumeSlider.addEventListener("input", (e) => {
  const volumeValue = e.target.value;
  socket.emit("media-control", `volume:${volumeValue}`);
});

// Brightness Slider
brightnessSlider.addEventListener("input", (e) => {
  const brightnessValue = e.target.value;
  socket.emit("media-control", `brightness:${brightnessValue}`);
});
=======
let pendingCommand = null;

function showPasswordDialog(command) {
  pendingCommand = command;
  document.getElementById("passwordModal").style.display = "block";
}

function submitProtectedCommand() {
  const password = document.getElementById("passwordInput").value;
  socket.emit("media-control", {
    command: pendingCommand,
    password: password,
  });
  hidePasswordDialog();
}

function cancelProtectedCommand() {
  pendingCommand = null;
  hidePasswordDialog();
}

function hidePasswordDialog() {
  document.getElementById("passwordModal").style.display = "none";
  document.getElementById("passwordInput").value = "";
}

// Modify your button click handlers for protected commands
document
  .getElementById("shutdownBtn")
  .addEventListener("click", () => showPasswordDialog("shutdown"));
document
  .getElementById("restartBtn")
  .addEventListener("click", () => showPasswordDialog("restart"));
document
  .getElementById("sleepBtn")
  .addEventListener("click", () => showPasswordDialog("sleep"));
document
  .getElementById("lockBtn")
  .addEventListener("click", () => showPasswordDialog("lock"));
>>>>>>> 62fdaa8a97048925d32998fdf0ce3b7d4bb0972f

fetch("/ipinfo")
  .then((response) => response.text())
  .then((ip) => {
    const accessUrl = `http://${ip}:3000`;

    document.getElementById(
      "ip-info"
    ).innerText = `Access this page at: ${accessUrl} on your phone.`;

    const qrcode = new QRCode(document.getElementById("qrcode"), {
      text: accessUrl,
      width: 128,
      height: 128,
      colorDark: "#000",
      colorLight: "#fff",
      correctLevel: QRCode.CorrectLevel.H,
    });
  })
  .catch(() => {
    document.getElementById(
      "ip-info"
    ).innerText = `Unable to fetch the server IP.`;
  });
