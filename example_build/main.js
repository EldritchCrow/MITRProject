const { app, BrowserWindow } = require('electron');
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
     width: 2000,
     height: 1500,
     webPreferences: {
       nodeIntegration: true
     }
   });
  
   mainWindow.maximize();
 
   // and load the index.html of the app.
   mainWindow.loadFile(path.join(__dirname, '../public/index.html'));
 
   // Open the DevTools.
   mainWindow.webContents.openDevTools();
 };

app.on('ready', createWindow);
