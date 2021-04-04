import { injectable } from 'inversify';
import { IpcTransport } from '../../interfaces/ipc-transport.interface';
import IpcProcessCommunicator from '../../process/IpcProcessCommunicator';
import { MessageHandler } from '../../types/message-handler.type';

@injectable()
export class ProcessTransportAdapter implements IpcTransport {
  private processCommunicator: IpcProcessCommunicator;

  constructor() {
    this.processCommunicator = new IpcProcessCommunicator();
  }

  public send(pattern: string, data: unknown): void {
    this.processCommunicator.send(pattern, data);
  }

  register(pattern: string, handler: MessageHandler): void {
    this.processCommunicator.on(pattern, handler);
  }
}
