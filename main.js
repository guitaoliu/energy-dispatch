const electron = require('electron')

const { app, BrowserWindow } = electron
let mainWindow

function createWindow() {
  mainWindow = new BrowserWindow({
    width: 1366,
    height: 768,
  })
  // mainWindow.setMenu(null)
  mainWindow.loadURL(`file://${__dirname}/index.html`)
  mainWindow.on('closed', () => {
    mainWindow = null
  })
}

app.on('ready', createWindow)

app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') {
    app.quit()
  }
})

app.on('activate', () => {
  if (mainWindow === null) {
    createWindow()
  }
})
