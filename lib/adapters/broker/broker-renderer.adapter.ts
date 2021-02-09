import { ipcMain } from 'electron';
import { IpcTransport } from '../../interfaces/ipc-transport.interface';

export class BrokerRendererAdapter implements IpcTransport {
  constructor(private rendererSend: (pattern: string, data: any) => void) {}

  public send(pattern: any, data: any): void {
    this.rendererSend(pattern, data);
  }

  public register(pattern: any, handler: any): void | Promise<void> {
    ipcMain.handle(pattern, handler);
  }
}
