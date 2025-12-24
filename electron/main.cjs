const { app, BrowserWindow, shell, ipcMain } = require('electron');
const path = require('path');
const fs = require('fs');

const SETTINGS_FILE = path.join(app.getPath ? app.getPath('userData') : '.', 'sora2-settings.json');
const PROJECTS_FILE = path.join(app.getPath ? app.getPath('userData') : '.', 'sora2-projects.json');

let mainWindow;

const createWindow = () => {
  mainWindow = new BrowserWindow({
    width: 1280,
    height: 800,
    title: "Sora2 Manager",
    webPreferences: {
      nodeIntegration: false,
      contextIsolation: true,
      preload: path.join(__dirname, 'preload.cjs'), 
    },
    autoHideMenuBar: true,
  });

  const isDev = !app.isPackaged;
  if (isDev) {
    mainWindow.loadURL('http://localhost:5173');
  } else {
    mainWindow.loadFile(path.join(__dirname, '../dist/index.html'));
  }

  mainWindow.webContents.setWindowOpenHandler(({ url }) => {
    shell.openExternal(url);
    return { action: 'deny' };
  });

  ipcMain.on('download-video', (event, { url, filename }) => {
    const savePath = path.join(app.getPath('downloads'), filename);
    mainWindow.webContents.downloadURL(url);
    mainWindow.webContents.session.once('will-download', (e, item) => {
      item.setSavePath(savePath);
    });
  });

  // IPC handlers for settings persistence
  ipcMain.handle('get-settings', async () => {
    try {
      if (fs.existsSync(SETTINGS_FILE)) {
        const raw = fs.readFileSync(SETTINGS_FILE, 'utf8');
        return JSON.parse(raw || '{}');
      }
    } catch (e) {
      console.error('读取设置失败:', e);
    }
    return {}; // 默认空对象，前端会合并默认值
  });

  ipcMain.handle('save-settings', async (event, settings) => {
    try {
      const dir = path.dirname(SETTINGS_FILE);
      if (!fs.existsSync(dir)) fs.mkdirSync(dir, { recursive: true });
      fs.writeFileSync(SETTINGS_FILE, JSON.stringify(settings || {}, null, 2), 'utf8');
      return { ok: true };
    } catch (e) {
      console.error('保存设置失败:', e);
      return { ok: false, error: String(e) };
    }
  });

  // IPC handlers for projects persistence
  ipcMain.handle('get-projects', async () => {
    try {
      if (fs.existsSync(PROJECTS_FILE)) {
        const raw = fs.readFileSync(PROJECTS_FILE, 'utf8');
        return JSON.parse(raw || 'null');
      }
    } catch (e) {
      console.error('读取项目列表失败:', e);
    }
    return null;
  });

  ipcMain.handle('save-projects', async (event, payload) => {
    try {
      const dir = path.dirname(PROJECTS_FILE);
      if (!fs.existsSync(dir)) fs.mkdirSync(dir, { recursive: true });
      fs.writeFileSync(PROJECTS_FILE, JSON.stringify(payload || {}, null, 2), 'utf8');
      return { ok: true };
    } catch (e) {
      console.error('保存项目列表失败:', e);
      return { ok: false, error: String(e) };
    }
  });
};

app.whenReady().then(createWindow);
app.on('window-all-closed', () => { if (process.platform !== 'darwin') app.quit(); });