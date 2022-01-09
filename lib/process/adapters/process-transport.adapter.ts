import { injectable } from 'inversify';
import { ClientIpcTransport } from '../../core/interfaces/client-ipc-transport.interface';
import IpcProcess from '../../core/process/ipc-process';
import { MessageHandler } from '../../core/types/message-handler.type';

@injectable()
export class ProcessTransportAdapter implements ClientIpcTransport {
  constructor(private ipcProcess: IpcProcess) {}

  public send(pattern: string, data: unknown): void {
    this.ipcProcess.send(pattern, data);
  }

  public register(pattern: string, handler: MessageHandler): void {
    this.ipcProcess.on(pattern, handler);
  }

  public unregister(pattern: string, handler: MessageHandler): void {
    this.ipcProcess.removeListener(pattern, handler);
  }
}
