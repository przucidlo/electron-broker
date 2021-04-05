import { injectable } from 'inversify';
import { IpcTransport } from '../../interfaces/ipc-transport.interface';
import IpcProcess from '../../process/ipc-process';
import { MessageHandler } from '../../types/message-handler.type';

@injectable()
export class ProcessTransportAdapter implements IpcTransport {
  private ipcProcess: IpcProcess;

  constructor() {
    this.ipcProcess = new IpcProcess();
  }

  public send(pattern: string, data: unknown): void {
    this.ipcProcess.send(pattern, data);
  }

  register(pattern: string, handler: MessageHandler): void {
    this.ipcProcess.on(pattern, handler);
  }
}
