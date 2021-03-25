const electron = require('electron')

const { app, BrowserWindow } = electron
let mainWindow

function createWindow() {
  mainWindow = new BrowserWindow({
    minWidth: 1366,
    minHeight: 768,
  })
  mainWindow.setMenu(null)
  mainWindow.webContents.openDevTools()
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
