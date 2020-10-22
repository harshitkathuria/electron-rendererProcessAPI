// This file is required by the index.html file and will
// be executed in the renderer process for that window.
// All of the Node.js APIs are available in this process.

// console.log('in renderer process')
const remote = require('electron').remote
const { dialog, BrowserWindow, app } = remote

const dialogBtn = document.getElementById('dialog-btn')
const browserBtn = document.getElementById('browser-btn')
const quitBtn = document.getElementById('quit-btn')
const fullscreenBtn = document.getElementById('fullscreen-btn')

dialogBtn.addEventListener('click', e => {
  dialog.showMessageBox({ title: 'Renderer Message', message: 'Dialog from the renderer process' })
})

browserBtn.addEventListener('click', e => {
  const win = new BrowserWindow({
    width: 600, height: 600,
    webPreferences: { nodeIntegration: true }
  })
  win.loadFile('index.html')
})

quitBtn.addEventListener('click', () => app.quit())
fullscreenBtn.addEventListener('click', () => { 
  const curWin = remote.getCurrentWindow()
  curWin.maximize()
})