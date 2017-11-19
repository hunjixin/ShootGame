import { app, BrowserWindow, Menu} from 'electron'
import path from 'path'
import url from 'url'
import fs from 'fs'
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
  mainWindow.loadURL(`file://${__dirname}/index.html`);
  mainWindow.on('closed', () => {
    mainWindow = null
  })
}