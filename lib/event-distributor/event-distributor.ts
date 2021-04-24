import { injectable, multiInject } from 'inversify';
import { Symbols } from '../constants/symbols';
import { BrokerEvent } from '../interfaces/broker-event.interface';
import { IpcTransport } from '../interfaces/ipc-transport.interface';

@injectable()
export class EventDistributor {
  constructor(@multiInject(Symbols.BrokerIpcTransport) private adapters: IpcTransport[]) {}

  public broadcast(brokerEvent: BrokerEvent): void {
    for (const adapter of this.adapters) {
      adapter.send(brokerEvent.pattern, brokerEvent);
    }
  }
}
