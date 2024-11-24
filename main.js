const {app, BrowserWindow} = require('electron')

const createWindow = () => {
    const window = new BrowserWindow({
        width: 1200,
        height: 1000,
        minWidth: 700,
        minHeight: 500
    })

    window.loadFile('src/view/index.html')
}

app.whenReady().then (() =>{
    createWindow()
})


