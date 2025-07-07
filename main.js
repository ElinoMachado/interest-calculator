const { app, BrowserWindow, ipcMain } = require("electron");
const path = require("path");
const os = require("os");

let window;

function createWindow() {
  window = new BrowserWindow({
    width: 1024,
    height: 768,
    fullscreen: false,
    show: false, // mostra só quando estiver pronto
    webPreferences: {
      contextIsolation: true,
      nodeIntegration: false,
      preload: path.join(__dirname, "preload.js"),
    },
  });

  window.once("ready-to-show", () => {
    window.maximize();
    window.show();
  });
  const isDev = !app.isPackaged;

  if (isDev) {
    // 🔧 Modo desenvolvimento
    window.loadURL("http://localhost:4200");
    window.webContents.openDevTools();
  } else {
    // ✅ Modo produção — certifique-se do caminho certo!
    window.loadFile(
      path.join(
        __dirname,
        "dist",
        "interest-calculator",
        "browser",
        "index.html"
      )
    );
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
