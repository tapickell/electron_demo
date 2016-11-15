const electron = require("electron")

const countdown = require('./countdown.js')

const app = electron.app
const BrowserWindow = electron.BrowserWindow
const ipc = electron.ipcMain

let mainWindow

app.on('ready', _ => {
  mainWindow = new BrowserWindow({
    height: 400,
    width: 400
  })

  mainWindow.loadURL(`file://${__dirname}/countdown.html`)

  mainWindow.on('close', _ => {
    mainWindow = null
  })
})

ipc.on('countdown-start', _ => {
  console.log('countdown-start called')
  countdown(count => {
    mainWindow.webContents.send('countdown', count)
  })
})
