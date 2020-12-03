const { app, BrowserWindow, ipcMain } = require('electron');
const path = require('path');
let { registerVisit, resetDB, getRecents,
      getLocationNotes, getGeneralNotes,
      updateLocationNotes, updateGeneralNotes, userStmt} = require("../utils/sql_wrapper.js");

let mainWindow;
let lastPage = -1;

process.env.ELECTRON_ENABLE_LOGGING = 1;

const createWindow = () => {

  mainWindow = new BrowserWindow({
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

app.allowRendererProcessReuse = true;


ipcMain.on('registerVisit', (event, arg) => {
  registerVisit(parseInt(arg));
})
ipcMain.on('resetDB', (event, arg) => {
  resetDB();
})
ipcMain.on('getRecents', async (event, arg) => {
  var recents = (await getRecents()).map(x => x.event_id);
  event.reply('getRecents-reply', recents.join(","));
})
ipcMain.on('lastPage', (event, arg) => {
  lastPage = arg;
})
ipcMain.on('whatPage', (event, arg) => {
  event.reply('whatPage-reply', lastPage);
})
ipcMain.on('updateLocationNotes', (event, arg) => {
  updateLocationNotes(parseInt(arg.substring(0,8)), arg.substring(9));
});
ipcMain.on('updateGeneralNotes', (event, arg) => {
  updateGeneralNotes(parseInt(arg.substring(0,8)), arg.substring(9));
});
ipcMain.on('getLocationNotes', async (event, arg) => {
  var t = await getLocationNotes(parseInt(arg));
  event.reply("getLocNotes-reply", t);
});
ipcMain.on('getGeneralNotes', async (event, arg) => {
  var t = await getGeneralNotes(parseInt(arg));
  event.reply("getGenNotes-reply", t);
});

app.on('ready', createWindow);