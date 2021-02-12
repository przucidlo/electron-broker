import ChildProcess from 'child_process';
import { v4 as uuid } from 'uuid';
import { IpcProcessPayload } from './IpcProcessPayload';

export default abstract class IpcProcessTransportLayer {
  /** Process to which the transport layer is bound to*/
  protected readonly process: NodeJS.Process | ChildProcess.ChildProcess;

  constructor(childProcess?: NodeJS.Process | ChildProcess.ChildProcess) {
    this.process = childProcess ? childProcess : process;
  }

  public send(channelName: string, payload: any): void {
    this.process.send(<IpcProcessPayload>{ messageId: uuid(), channelName: channelName, payload: payload }, (error) => {
      if (error) {
        console.error(error);
      }
    });
  }
}
