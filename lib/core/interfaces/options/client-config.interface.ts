import { CommonConfig } from './common-config.interface';

export interface ClientConfig extends Omit<CommonConfig, 'mode'> {
  /**
   * Uses exposed methods of ipcRenderer object from preload.js file.
   *
   * Setting it to false will result in falling back to use the ipcRenderer
   * object directly, which won't work if your BrowserWindow doesn't have
   * nodeIntegration enabled and contextIsolation disabled.
   *
   * (See the documentation to read about setting up the preload.js file)
   *
   * @default true
   */
  secure?: boolean;
}
