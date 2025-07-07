const { app, BrowserWindow, ipcMain } = require("electron");
const path = require("path");
const url = require("url");
const os = require("os");

let window; // só declare aqui, mas não crie ainda

function createWindow() {
  window = new BrowserWindow({
    width: 1024,
    height: 768,
    fullscreen: false,
    webPreferences: {
      contextIsolation: true, // segurança ativada
      nodeIntegration: false, // segurança ativada
      preload: path.join(__dirname, "preload.js"), // <-- novo
    },
  });
  window.once("ready-to-show", () => {
    window.maximize();
    window.show();
  });
  // COMENTE ESTE SE FOR USAR MODO DEV
  /*  window.loadURL(
    url.format({
      pathname: path.join(
        __dirname,
        "dist",
        "interest-calculator",
        "browser",
        "index.html"
      ),
      protocol: "file:",
      slashes: true,
    })
  ); */

  // DESCOMENTE ESTE SE FOR USAR COM ng serve
  window.loadURL("http://localhost:4200");

  if (!app.isPackaged) {
    window.webContents.openDevTools();
  }
}
ipcMain.handle("get-system-info", async () => {
  return {
    username: os.userInfo().username,
    hostname: os.hostname(),
  };
});
app.whenReady().then(createWindow);

app.on("window-all-closed", () => {
  if (process.platform !== "darwin") app.quit();
});
