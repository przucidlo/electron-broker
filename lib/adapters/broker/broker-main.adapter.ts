import { ipcMain } from 'electron';
import { injectable } from 'inversify';
import { IpcTransport } from '../../interfaces/ipc-transport.interface';
import { MessageHandler } from '../../types/message-handler.type';

@injectable()
export class BrokerMainAdapter implements IpcTransport {
  send(pattern: string, data: unknown): void {
    ipcMain.emit(pattern, undefined, data);
  }

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  register(pattern: string, handler: MessageHandler): void {
    // Not used since message doesn't come from outside of the process.
  }
}
