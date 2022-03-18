import { BrokerEvent } from '../../interfaces/broker-event.interface';
import { IpcListener } from '../response-listener/ipc-listener';

export class BrokerEventSubscriber {
  private ipcListener: IpcListener;

  constructor(
    ipcListener: IpcListener,
    pattern: string,
    listener: (data: BrokerEvent) => void,
  ) {
    this.ipcListener = ipcListener;
    this.subscribe(pattern, listener);
  }

  protected subscribe(
    pattern: string,
    listener: (data: BrokerEvent) => void,
  ): void {
    this.ipcListener.listen(pattern, listener);
  }

  public unsubscribe(): void {
    this.ipcListener.removeListener();
  }
}
