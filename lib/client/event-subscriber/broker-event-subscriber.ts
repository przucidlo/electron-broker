import { BrokerEvent } from '../../interfaces/broker-event.interface';
import { ListenerFactory } from '../listener-adapter/factory/listener-factory';
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
    this.listenerAdapter = await ListenerFactory.createListener();

    this.listenerAdapter.listen(pattern, listener);
  }

  public unsubscribe(): void {
    this.listenerAdapter.removeListener();
  }
}
