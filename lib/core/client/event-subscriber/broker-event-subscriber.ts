import { BrokerEvent } from '../../interfaces/broker-event.interface';
import { ListenerAdapter } from '../listener-adapter/listener-adapter.interface';

export class BrokerEventSubscriber {
  private listenerAdapter: ListenerAdapter;

  constructor(pattern: string, listener: (data: BrokerEvent) => void) {
    this.subscribe(pattern, listener);
  }

  private async subscribe(
    pattern: string,
    listener: (data: BrokerEvent) => void,
  ) {
    this.listenerAdapter.listen(pattern, listener);
  }

  public unsubscribe(): void {
    this.listenerAdapter.removeListener();
  }
}
