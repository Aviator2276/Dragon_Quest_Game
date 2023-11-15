const { app, BrowserWindow } = require('electron');
const path = require('path');

const isDev = process.env.NODE_ENV !== 'development';
if (require('electron-squirrel-startup')) {
  app.quit();
}

const createWindow = () => {
  const window = new BrowserWindow({
    width: 1920,
    height: 1080,
    autoHideMenuBar: true,
    show: false,
    webPreferences: {
      preload: path.join(__dirname, 'preload.js'),
      nodeIntegration: true,
      contextIsolation: false,
    },
  });

  window.loadFile(path.join(__dirname, '../static/index.html'));
  if (isDev) {
    window.webContents.openDevTools();
  }
  window.on("ready-to-show", window.show)
  //window.setFullScreen(true)  //<--------------- UNCOMMENT BEFORE PRODUCTION
};

app.on('ready', createWindow);

app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') {
    app.quit();
  }
});

app.on('activate', () => {
  if (BrowserWindow.getAllWindows().length === 0) {
    createWindow();
  }
});

// In this file you can include the rest of your app's specific main process
// code. You can also put them in separate files and import them here.