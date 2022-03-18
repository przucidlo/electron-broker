import { IpcListener } from '../../../client/response-listener/ipc-listener';
import { Symbols } from '../../../constants/symbols';
import { ClientIpcTransport } from '../../../interfaces/client-ipc-transport.interface';
import { ListenerFactory } from '../../../types/listener-factory.type';
import { ContainerConfiguarableComposer } from '../../abstract/container-configurable-composer';

export class IpcListenerFactoryComposer extends ContainerConfiguarableComposer {
  public compose(): void {
    const ipcTransport: ClientIpcTransport = this.container.get(
      Symbols.IpcTransport,
    );

    this.container
      .bind(Symbols.ListenerFactory)
      .toFactory((): ListenerFactory => () => new IpcListener(ipcTransport));
  }
}
