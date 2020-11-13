const {app, BrowserWindow} = require('electron');
const url = require('url');
const path = require('path');

let win;

// function createWindow() { 
//    win = new BrowserWindow({width: 800, height: 600}) 
//    win.loadURL(url.format ({ 
//       pathname: path.join(__dirname, 'index.html'), 
//       protocol: 'file:', 
//       slashes: true 
//    })) 
// }

const createWindow = () => {

   const mainWindow = new BrowserWindow({
     width: 800,
     height: 600,
     webPreferences: {
       nodeIntegration: true
     }
   });
 
   // and load the index.html of the app.
   mainWindow.loadFile(path.join(__dirname, '../Public/index.html'));
 
   // Open the DevTools.
   // mainWindow.webContents.openDevTools();
 };

app.on('ready', createWindow);