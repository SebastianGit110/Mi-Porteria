const path = require("path");
const { app, BrowserWindow } = require("electron");
require("../backend/index.js");

const isDev = process.env.IS_DEV == "true" ? true : false;

function createWindow() {
  const mainWindow = new BrowserWindow({
    width: 1024,
    height: 650,
    autoHideMenuBar: true,
    resizable: true,
    frame: true,
    webPreferences: {
      preload: path.join(__dirname, "preload.js"),
      nodeIntegration: true,
      contextIsolation: false,
    },
  });

  mainWindow.webContents.setWindowOpenHandler((edata) => {
    shell.openExternal(edata.url);
    return { action: "deny" };
  });

  if (isDev) {
    mainWindow.loadURL("http://localhost:3000");
    console.log(path.join(__dirname, "dist", "index.html"));
    console.log("Holaaaaaaaaaa");
    // "C:/Users/HERNANDO/OneDrive/Escritorio/Proyecto Admin/Admin Project/dist/index.html"
  } else {
    // Otra forma de hacerlo es dejando el main en la raiz del proyecto y puede funcionar
    // console.log("No es dev ", path.join(__dirname, "dist", "index.html"));
    console.log(path.join(app.getAppPath(), "dist", "index.html"));
    console.log(app.getAppPath());
    console.log(path.join(app.getAppPath(), "index.html"));
    console.log(path.join(__dirname, "..", "..", "..", "dist", "index.html"));
    // mainWindow.loadFile(path.join(__dirname, "dist", "index.html"));
    const indexPath = path.join(
      app.getAppPath(),
      "..",
      "..",
      "..",
      "index.html"
    );
    mainWindow.loadFile(indexPath);
  }

  // Open the DevTools.
  mainWindow.webContents.openDevTools();
}

app.whenReady().then(() => {
  createWindow();
  app.on("activate", function () {
    if (BrowserWindow.getAllWindows().length === 0) createWindow();
  });
});

app.on("window-all-closed", () => {
  if (process.platform !== "darwin") {
    app.quit();
  }
});
