const { ipcRenderer, contextBridge } = require("electron");

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
});
