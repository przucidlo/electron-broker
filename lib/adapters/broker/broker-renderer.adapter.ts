import { BrowserWindow, ipcMain } from 'electron';
import { IpcTransport } from '../../interfaces/ipc-transport.interface';
import { MessageHandler } from '../../types/message-handler.type';

export class BrokerRendererAdapter implements IpcTransport {
  constructor(private browserWindow: BrowserWindow) {}

  public send(pattern: string, data: unknown): void {
    this.browserWindow.webContents.send(pattern, data);
  }

  public register(pattern: string, handler: MessageHandler): void {
    ipcMain.on(pattern, handler);
  }
}
