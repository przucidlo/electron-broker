import { injectable } from 'inversify';
import { IpcTransport } from '../interfaces/ipc-transport.interface';
import IpcProcessCommunicator from '../process/IpcProcessCommunicator';

@injectable()
export class ProcessTransportAdapter implements IpcTransport {
  private processCommunicator: IpcProcessCommunicator;

  constructor() {
    this.processCommunicator = new IpcProcessCommunicator();
  }

  public send(pattern: any, data: any): void {
    this.processCommunicator.send(pattern, data);
  }

  register(pattern: any, handler: any): void {
    this.processCommunicator.on(pattern, handler);
  }
}
