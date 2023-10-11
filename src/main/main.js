const { app, BrowserWindow } = require('electron');
const path = require('path');

function createWindow () {
  const win = new BrowserWindow({
    width: 1920,
    height: 1080,
    autoHideMenuBar: true,
    webPreferences: {
      // WARNING: This is very dangerous if any remote content is displayed.
      // Since this is all local, it is okay. Please review before production.
      nodeIntegration: true,
      contextIsolation: false,
      preload: path.join(__dirname, './preload.js')
    }
  })

  win.loadFile('./src/static/startGame.html')
  //win.setFullScreen(true) //<--------------- UNCOMMENT BEFORE PRODUCTION
}

app.whenReady().then(() => {
  createWindow()

  app.on('activate', () => {
    if (BrowserWindow.getAllWindows().length === 0) {
      createWindow()
    }
  })
})

app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') {
    app.quit()
  }
})

try {
  require('electron-reloader')(module)
} catch (_) {}