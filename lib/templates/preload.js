/* eslint-disable @typescript-eslint/explicit-module-boundary-types */
// eslint-disable-next-line @typescript-eslint/no-var-requires
const { contextBridge, ipcRenderer } = require('electron');

const BROKER_CHANNEL = 'BROKER_EVENT';

contextBridge.exposeInMainWorld('broker', {
    send: (channel, data) => {
      if (channel === BROKER_CHANNEL) {    
        ipcRenderer.send(channel, data);
      }
    },
    on: (channel, handler) => {
      ipcRenderer.on(channel, (event, ...args) => { 
        handler(args[0]);
      });
    },
    removeListener: (channel, handler) => {
      ipcRenderer.removeListener(channel, handler);
    }
});