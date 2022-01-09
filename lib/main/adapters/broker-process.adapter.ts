import { IpcTransport } from '../../core/interfaces/ipc-transport.interface';
import IpcProcess from '../../core/process/ipc-process';
import { MessageHandler } from '../../core/types/message-handler.type';

export class BrokerProcessAdapter implements IpcTransport {
  constructor(private ipcProcess: IpcProcess) {}

  public send(pattern: string, data: unknown): void {
    this.ipcProcess.send(pattern, data);
  }

  public register(pattern: string, handler: MessageHandler): void {
    this.ipcProcess.on(pattern, handler);
  }
}
