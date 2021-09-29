import { ListenerFactory } from '../../../client/listener-adapter/factory/listener-factory';
import { BrokerResponseListener } from '../../../client/response-listener/broker-response-listener';
import { Symbols } from '../../../constants/symbols';
import { BrokerResponseListenerFactory } from '../../../types/broker-responser-listener-factory.type';
import { ContainerConfiguarableComposer } from '../../abstract/container-configurable-composer';

export class BrokerResponseListenerFactoryComposer extends ContainerConfiguarableComposer {
  public compose(): void {
    this.bindFactory();
  }

  private bindFactory(): void {
    this.container.bind(Symbols.BrokerResponseListenerFactory).toFactory(
      (): BrokerResponseListenerFactory => (brokerEvent) => {
        return new BrokerResponseListener(
          brokerEvent,
          ListenerFactory.createListener(),
        );
      },
    );
  }
}
