import { BrokerEvent } from '../../interfaces/broker-event.interface';
import { ClientIpcTransport } from '../../interfaces/client-ipc-transport.interface';

export class IpcListener {
  private listener: (response: BrokerEvent) => void;
  private pattern: string;

  constructor(private ipcTransport: ClientIpcTransport) {}

  public listen(
    pattern: string,
    listener: (response: BrokerEvent) => void,
  ): void {
    this.pattern = pattern;
    this.listener = listener;

    this.ipcTransport.register(this.pattern, this.listener);
  }

  public removeListener(): void {
    this.ipcTransport.unregister(this.pattern, this.listener);
  }
}
