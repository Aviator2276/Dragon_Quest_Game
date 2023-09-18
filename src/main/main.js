const { app, BrowserWindow } = require('electron')
const path = require('path')

function createWindow () {
  const win = new BrowserWindow({
    width: 1920,
    height: 1080,
    autoHideMenuBar: true,
    webPreferences: {
      preload: path.join(__dirname, './src/main/preload.js')
    }
  })

  const { initializeGame } = require('./game.js');
  initializeGame();

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