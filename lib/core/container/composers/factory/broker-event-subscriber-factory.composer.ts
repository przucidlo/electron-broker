import { BrokerEventSubscriber } from '../../../client/event-subscriber/broker-event-subscriber';
import { Symbols } from '../../../constants/symbols';
import { BrokerEventSubscriberFactory } from '../../../types/broker-event-subscriber-factory.type';
import { ListenerFactory } from '../../../types/listener-factory.type';
import { ContainerConfiguarableComposer } from '../../abstract/container-configurable-composer';

export class BrokerEventSubscriberFactoryComposer extends ContainerConfiguarableComposer {
  public compose(): void {
    const listenerFactory: ListenerFactory = this.container.get(
      Symbols.ListenerFactory,
    );

    this.container
      .bind(Symbols.ClientSubscriberFactory)
      .toFactory(
        (): BrokerEventSubscriberFactory => (pattern, listener) =>
          new BrokerEventSubscriber(listenerFactory(), pattern, listener),
      );
  }
}
