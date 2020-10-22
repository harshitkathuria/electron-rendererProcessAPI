const { ipcRenderer } = require("electron")

let i = 1
setInterval(() => {
  console.log(i)
  i++
}, 1000)

document.getElementById('ipc-btn').addEventListener('click', e => {
  ipcRenderer.send('channel1', 'Message from renderer process')
  ipcRenderer.send('channel2', { name: 'Harshit', age: '19' })
  // Receiving response from main process synchronously
  let res = ipcRenderer.sendSync('sync-msg', 'Sending Synchronous Msg from renderer process')
  console.log(res)
})

ipcRenderer.on('channel1-main', (e, args) => {
  console.log(args)
})

ipcRenderer.on('channel-web-main', (e, args) => {
  console.log(args)
})