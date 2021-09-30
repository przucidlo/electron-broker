import { ListenerFactory } from '../../../client/listener-adapter/factory/listener-factory';
import { ResponseListener } from '../../../client/response-listener/response-listener';
import { Symbols } from '../../../constants/symbols';
import { ResponseListenerFactory } from '../../../types/response-listener-factory.type';
import { ContainerConfiguarableComposer } from '../../abstract/container-configurable-composer';

export class ResponseListenerFactoryComposer extends ContainerConfiguarableComposer {
  public compose(): void {
    this.bindFactory();
  }

  private bindFactory(): void {
    this.container.bind(Symbols.ResponseListenerFactory).toFactory(
      (): ResponseListenerFactory => (brokerEvent) => {
        return new ResponseListener(
          brokerEvent,
          ListenerFactory.createListener(),
        );
      },
    );
  }
}
