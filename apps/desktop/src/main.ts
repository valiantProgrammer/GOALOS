import { app, BrowserWindow, Tray, Menu, Notification, ipcMain, shell } from "electron";
import * as path from "path";
import * as fs from "fs";

// 1. Single Instance Lock
const gotTheLock = app.requestSingleInstanceLock();
if (!gotTheLock) {
  console.log("GoalOS already running. Quitting secondary instance.");
  app.quit();
  process.exit(0);
}

// 2. Custom Protocol Registration: goalos://
if (process.defaultApp) {
  if (process.argv.length >= 2) {
    app.setAsDefaultProtocolClient("goalos", process.execPath, [path.resolve(process.argv[1])]);
  }
} else {
  app.setAsDefaultProtocolClient("goalos");
}

let mainWindow: BrowserWindow | null = null;
let tray: Tray | null = null;
const isDev = process.env.NODE_ENV !== "production";
const WEB_URL = process.env.GOALOS_WEB_URL || "http://localhost:3000";
const OFFLINE_HTML = path.join(__dirname, "..", "assets", "offline.html");

// 3. Window State Persistence
interface WindowState {
  width: number;
  height: number;
  x?: number;
  y?: number;
}

function getWindowStatePath(): string {
  return path.join(app.getPath("userData"), "window-state.json");
}

function loadWindowState(): WindowState {
  try {
    const file = getWindowStatePath();
    if (fs.existsSync(file)) {
      return JSON.parse(fs.readFileSync(file, "utf-8"));
    }
  } catch (err) {
    console.error("Failed to read window state:", err);
  }
  return { width: 1440, height: 900 };
}

function saveWindowState(win: BrowserWindow) {
  try {
    const bounds = win.getBounds();
    fs.writeFileSync(getWindowStatePath(), JSON.stringify(bounds, null, 2), "utf-8");
  } catch (err) {
    console.error("Failed to save window state:", err);
  }
}

// 4. Create Main Window
function createWindow() {
  const savedState = loadWindowState();

  mainWindow = new BrowserWindow({
    width: savedState.width || 1440,
    height: savedState.height || 900,
    x: savedState.x,
    y: savedState.y,
    minWidth: 1024,
    minHeight: 700,
    backgroundColor: "#050814",
    title: "GoalOS — The Hunter System",
    titleBarStyle: process.platform === "darwin" ? "hiddenInset" : "default",
    icon: path.join(__dirname, "..", "assets", "icon.png"),
    autoHideMenuBar: true,
    webPreferences: {
      preload: path.join(__dirname, "preload.js"),
      contextIsolation: true,
      nodeIntegration: false,
      sandbox: true,
    },
  });

  // Debounced window bounds saver
  let resizeTimeout: NodeJS.Timeout | null = null;
  const onBoundsChange = () => {
    if (resizeTimeout) clearTimeout(resizeTimeout);
    resizeTimeout = setTimeout(() => {
      if (mainWindow && !mainWindow.isDestroyed()) {
        saveWindowState(mainWindow);
      }
    }, 500);
  };

  mainWindow.on("resize", onBoundsChange);
  mainWindow.on("move", onBoundsChange);

  // Load web app with offline fallback
  mainWindow.loadURL(WEB_URL).catch((err) => {
    console.warn(`Could not connect to ${WEB_URL}, displaying offline screen:`, err.message);
    if (fs.existsSync(OFFLINE_HTML)) {
      mainWindow?.loadFile(OFFLINE_HTML);
    }
  });

  // Security: Handle external navigations & OAuth
  mainWindow.webContents.setWindowOpenHandler(({ url }) => {
    // Open OAuth (Google, Discord) and external links in the default browser
    if (
      url.includes("accounts.google.com") ||
      url.includes("discord.com/oauth2") ||
      url.startsWith("http:") ||
      url.startsWith("https:")
    ) {
      if (!url.startsWith(WEB_URL)) {
        shell.openExternal(url);
        return { action: "deny" };
      }
    }
    return { action: "allow" };
  });

  mainWindow.webContents.on("will-navigate", (event, url) => {
    if (url.includes("accounts.google.com") || (!url.startsWith(WEB_URL) && !url.startsWith("file://"))) {
      event.preventDefault();
      shell.openExternal(url);
    }
  });

  mainWindow.on("closed", () => {
    mainWindow = null;
  });
}

// 5. System Tray with Quick Actions
function createTray() {
  const iconPath = path.join(__dirname, "..", "assets", "tray.png");
  if (!fs.existsSync(iconPath)) return;

  try {
    tray = new Tray(iconPath);
    tray.setToolTip("GoalOS — The Hunter System");

    const contextMenu = Menu.buildFromTemplate([
      {
        label: "Open GoalOS",
        click: () => {
          if (!mainWindow) createWindow();
          mainWindow?.show();
          mainWindow?.focus();
        },
      },
      {
        label: "Today's Quests",
        click: () => {
          if (!mainWindow) createWindow();
          mainWindow?.loadURL(`${WEB_URL}/quests`);
          mainWindow?.show();
          mainWindow?.focus();
        },
      },
      {
        label: "Habits Tracker",
        click: () => {
          if (!mainWindow) createWindow();
          mainWindow?.loadURL(`${WEB_URL}/habits`);
          mainWindow?.show();
          mainWindow?.focus();
        },
      },
      {
        label: "Hunter Status",
        click: () => {
          if (!mainWindow) createWindow();
          mainWindow?.loadURL(`${WEB_URL}/status`);
          mainWindow?.show();
          mainWindow?.focus();
        },
      },
      { type: "separator" },
      {
        label: "Quit GoalOS",
        click: () => {
          app.quit();
        },
      },
    ]);

    tray.setContextMenu(contextMenu);
    tray.on("click", () => {
      if (mainWindow?.isVisible()) {
        mainWindow.focus();
      } else {
        mainWindow?.show();
      }
    });
  } catch (err) {
    console.error("Failed to create system tray:", err);
  }
}

// 6. Deep Link Protocol Handler
function handleDeepLink(url: string) {
  if (!url || !url.startsWith("goalos://")) return;
  console.log("Received deep link:", url);

  const cleanPath = url.replace("goalos://", "");
  const targetUrl = `${WEB_URL}/${cleanPath.replace(/^\/+/, "")}`;

  if (mainWindow) {
    if (mainWindow.isMinimized()) mainWindow.restore();
    mainWindow.show();
    mainWindow.focus();
    mainWindow.loadURL(targetUrl);
    mainWindow.webContents.send("desktop:deeplink", url);
  }
}

// Handle second instance
app.on("second-instance", (_event, commandLine) => {
  if (mainWindow) {
    if (mainWindow.isMinimized()) mainWindow.restore();
    mainWindow.show();
    mainWindow.focus();
  }
  // Windows: find protocol argument in command line
  const urlArg = commandLine.find((arg) => arg.startsWith("goalos://"));
  if (urlArg) {
    handleDeepLink(urlArg);
  }
});

// macOS: Handle open-url
app.on("open-url", (event, url) => {
  event.preventDefault();
  handleDeepLink(url);
});

// 7. IPC Handlers
ipcMain.on("desktop:notify", (_event, { title, body }) => {
  if (Notification.isSupported()) {
    new Notification({
      title: title || "GoalOS — System Alert",
      body: body || "",
      icon: path.join(__dirname, "..", "assets", "icon.png"),
    }).show();
  }
});

ipcMain.on("desktop:open-external", (_event, url) => {
  if (url && (url.startsWith("http://") || url.startsWith("https://"))) {
    shell.openExternal(url);
  }
});

ipcMain.on("desktop:set-autolaunch", (_event, enable: boolean) => {
  app.setLoginItemSettings({
    openAtLogin: enable,
    path: process.execPath,
  });
});

ipcMain.handle("desktop:get-autolaunch", () => {
  const settings = app.getLoginItemSettings();
  return settings.openAtLogin;
});

// App Lifecycle
app.whenReady().then(() => {
  createWindow();
  createTray();

  app.on("activate", () => {
    if (BrowserWindow.getAllWindows().length === 0) {
      createWindow();
    }
  });
});

app.on("window-all-closed", () => {
  if (process.platform !== "darwin") {
    app.quit();
  }
});
