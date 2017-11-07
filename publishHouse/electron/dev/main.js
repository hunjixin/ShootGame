import { app, BrowserWindow ,Menu} from 'electron'
import path from 'path'
import url from 'url'
import {CreateMenu} from './MenuTemplate.js'
import Config from './config.js'
import {EmitManager} from './emitManager.js'

let mainWindow
let emitManager


app.on('ready', ()=> {
  createWindow()
  var menu = Menu.buildFromTemplate(CreateMenu(emitManager))
  Menu.setApplicationMenu(menu)
})

app.on('window-all-closed', ()=>  {
  if (process.platform !== 'darwin') {
    app.quit()
  }
})

app.on('activate', ()=>  {
  if (mainWindow === null) {
    createWindow()
  }
})

function createWindow () {
  mainWindow = new BrowserWindow(Config)
  mainWindow.webContents.openDevTools()
  mainWindow.loadURL(url.format({
    pathname: "/pub/index.html",
    protocol: 'file:',
    slashes: true
  }))
  emitManager=new EmitManager(mainWindow);
  mainWindow.on('closed', ()=>{ mainWindow = null})
}
