import { BrowserWindow, ipcMain } from 'electron';
import { IpcTransport } from '../../interfaces/ipc-transport.interface';

export class BrokerRendererAdapter implements IpcTransport {
  constructor(private browserWindow: BrowserWindow) {}

  public send(pattern: any, data: any): void {
    this.browserWindow.webContents.send(pattern, data);
  }

  public register(pattern: any, handler: any): void | Promise<void> {
    ipcMain.handle(pattern, handler);
  }
}
