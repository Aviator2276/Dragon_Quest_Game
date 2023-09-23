import { app, BrowserWindow} from 'electron';
import { path } from 'path';
//
import electronReloader from 'electron-reloader';
import { initializeGame } from './game.mjs';

function createWindow () {
  const win = new BrowserWindow({
    width: 1920,
    height: 1080,
    autoHideMenuBar: true,
    webPreferences: {
      preload: path.join(__dirname, './preload.mjs')
    }
  })

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
  //electronReloader(module);
} catch (_) {}