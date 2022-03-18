import { ResponseListener } from '../../../client/response-listener/response-listener';
import { Symbols } from '../../../constants/symbols';
import { ListenerFactory } from '../../../types/listener-factory.type';
import { ResponseListenerFactory } from '../../../types/response-listener-factory.type';
import { ContainerConfiguarableComposer } from '../../abstract/container-configurable-composer';

export class ResponseListenerFactoryComposer extends ContainerConfiguarableComposer {
  public compose(): void {
    this.bindFactory();
  }

  private bindFactory(): void {
    const listenerFactory: ListenerFactory = this.container.get(
      Symbols.ListenerFactory,
    );

    this.container.bind(Symbols.ResponseListenerFactory).toFactory(
      (): ResponseListenerFactory => (brokerEvent, timeoutInSeconds) => {
        return new ResponseListener(
          brokerEvent,
          listenerFactory(),
          timeoutInSeconds,
        );
      },
    );
  }
}
