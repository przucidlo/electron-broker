import { ChildProcess } from 'child_process';
import { IpcTransport } from '../../interfaces/ipc-transport.interface';
import IpcProcessCommunicator from '../../process/IpcProcessCommunicator';

export class BrokerProcessAdapter implements IpcTransport {
  private processCommunicator: IpcProcessCommunicator;

  constructor(process: NodeJS.Process | ChildProcess) {
    this.processCommunicator = new IpcProcessCommunicator(process);
  }

  public send(pattern: any, data: any): void {
    this.processCommunicator.send(pattern, data);
  }

  public register(pattern: any, handler: any): void {
    this.processCommunicator.on(pattern, handler);
  }
}
