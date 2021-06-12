const { ipcRenderer, contextBridge } = require("electron");
const { readFileSync } = require("fs");
const { shell } = require("electron");

contextBridge.exposeInMainWorld("electron", {
  message: {
    send: (payload) => ipcRenderer.send("message", payload),
    on: (handler) => ipcRenderer.on("message", handler),
    off: (handler) => ipcRenderer.off("message", handler),
  },

  response: {
    send: (payload) => ipcRenderer.send("response", payload),
    on: (handler) => ipcRenderer.on("response", handler),
    off: (handler) => ipcRenderer.off("response", handler),
  },

  readFile: function (path) {
    const data = readFileSync(path, { encoding: "utf-8" });
    return data;
  },
  openLink: function (url) {
    shell.openExternal(url);
  },
});
