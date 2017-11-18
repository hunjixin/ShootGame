import { app, BrowserWindow, Menu} from 'electron'
import path from 'path'
import url from 'url'

let mainWindow
let emitManager


app.on('ready', () => {
  createWindow()
})

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

function createWindow() {
  var winConfig={
    width: 800,
    height: 600,
    title: 'ildasm',
    icon: 'images/sd.icon'
  }  
  mainWindow = new BrowserWindow(winConfig)
  mainWindow.webContents.openDevTools()
  mainWindow.loadURL(url.format({
    pathname: "index.html",
    protocol: 'file:',
    slashes: true
  }))
  mainWindow.on('closed', () => {
    mainWindow = null
  })
}