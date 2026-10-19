import { contextBridge, ipcRenderer } from "electron";

// Secure context bridge exposing only vetted APIs to renderer
contextBridge.exposeInMainWorld("goalosDesktop", {
  isElectron: true,
  platform: process.platform,
  version: "0.1.0",
  showNotification: (title: string, body: string) => {
    ipcRenderer.send("desktop:notify", { title, body });
  },
  onDeepLink: (callback: (url: string) => void) => {
    const handler = (_event: unknown, url: string) => callback(url);
    ipcRenderer.on("desktop:deeplink", handler);
    return () => {
      ipcRenderer.removeListener("desktop:deeplink", handler);
    };
  },
  setAutoLaunch: (enable: boolean) => {
    ipcRenderer.send("desktop:set-autolaunch", enable);
  },
  getAutoLaunch: (): Promise<boolean> => {
    return ipcRenderer.invoke("desktop:get-autolaunch");
  },
  openExternal: (url: string) => {
    ipcRenderer.send("desktop:open-external", url);
  },
});
