const socket = io();

function sendCommand(command) {
  socket.emit("media-control", command);
}

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
