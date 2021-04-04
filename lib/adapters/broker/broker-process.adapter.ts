import { ChildProcess } from 'child_process';
import { IpcTransport } from '../../interfaces/ipc-transport.interface';
import IpcProcessCommunicator from '../../process/IpcProcessCommunicator';
import { MessageHandler } from '../../types/message-handler.type';

export class BrokerProcessAdapter implements IpcTransport {
  private processCommunicator: IpcProcessCommunicator;

  constructor(process: NodeJS.Process | ChildProcess) {
    this.processCommunicator = new IpcProcessCommunicator(process);
  }

  public send(pattern: string, data: unknown): void {
    this.processCommunicator.send(pattern, data);
  }

  public register(pattern: string, handler: MessageHandler): void {
    this.processCommunicator.on(pattern, handler);
  }
}
