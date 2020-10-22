// Modules
const {app, BrowserWindow, ipcMain} = require('electron')

// Keep a global reference of the window object, if you don't, the window will
// be closed automatically when the JavaScript object is garbage collected.
let mainWindow

// Create a new BrowserWindow when `app` is ready
function createWindow () {

  mainWindow = new BrowserWindow({
    width: 1000, height: 800,
    webPreferences: { nodeIntegration: true, enableRemoteModule: true }
  })

  // Load index.html into the new BrowserWindow
  mainWindow.loadFile('index.html')

  mainWindow.webContents.on('did-finish-load', () => {
    mainWindow.webContents.send('channel-web-main', [1, 2, 3])
  })

  // Open DevTools - Remove for PRODUCTION!
  mainWindow.webContents.openDevTools();

  // Listen for window being closed
  mainWindow.on('closed',  () => {
    mainWindow = null
  })
}

ipcMain.on('sync-msg', (e, args) => {
  console.log(args)
  // Pause the execution of the renderer process for 4 seconds
  // setTimeout(() => { e.returnValue = 'A synchronous response from main process' }, 4000)
})

ipcMain.on('channel1', (e, args) => {
  console.log(args)
  e.sender.send('channel1-main', 'Message Recieved in main process')
})

ipcMain.on('channel2', (e, args) => {
  console.log(args)
})

// Electron `app` is ready
app.on('ready', createWindow)

// Quit when all windows are closed - (Not macOS - Darwin)
app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') app.quit()
})

// When app icon is clicked and app is running, (macOS) recreate the BrowserWindow
app.on('activate', () => {
  if (mainWindow === null) createWindow()
})
