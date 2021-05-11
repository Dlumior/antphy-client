// Native
const { join } = require("path");
const { format } = require("url");

// Packages
const { BrowserWindow, app, ipcMain } = require("electron");
const isDev = require("electron-is-dev");
const prepareNext = require("electron-next");
const { sendMessage } = require("./communication");

// Prepare the renderer once the app is ready
app.on("ready", async () => {
  await prepareNext("./renderer");

  const mainWindow = new BrowserWindow({
    width: 1280,
    height: 720,
    webPreferences: {
      nodeIntegration: true,
      preload: join(__dirname, "preload.js"),
    },
  });

  const prodUrl = format({
    pathname: join(__dirname, "../renderer/out/index.html"),
    protocol: "file:",
    slashes: true,
  });

  const devUrl = "http://localhost:8000";

  const sysUrl = isDev ? devUrl : prodUrl;

  mainWindow.loadURL(sysUrl);
  mainWindow.once("ready-to-show", () => {
    mainWindow.maximize();
  });

  exports.mainWindow = mainWindow;
});

// Quit the app once all windows are closed
app.on("window-all-closed", app.quit);

// listen the channel `message` and resend the received message to the renderer process
ipcMain.on("message", (event, message) => {
  console.log("Sending message");
  sendMessage(message, event);
});
