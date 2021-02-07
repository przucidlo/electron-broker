import { ipcMain } from 'electron';
import { injectable } from 'inversify';
import { IpcTransport } from '../interfaces/ipc-transport.interface';

@injectable()
export class BrokerMainAdapter implements IpcTransport {
  send(pattern: string, data: unknown): void {
    ipcMain.emit(pattern, data);
  }

  register(pattern: string, handler: any): void | Promise<void> {
    // Not used since message doesn't come outside of the process.
  }
}
