import { Symbols } from '../../../core/constants/symbols';
import { IpcTransport } from '../../../core/interfaces/ipc-transport.interface';
import { ClassType } from '../../../core/types/class.type';
import { ContainerConfiguarableComposer } from '../../../core/container/abstract/container-configurable-composer';
import { ClientConfig } from '../../../core/interfaces/options/client-config.interface';

export class RendererIpcTransportComposer extends ContainerConfiguarableComposer<ClientConfig> {
  public async compose(): Promise<void> {
    let adapter: ClassType<IpcTransport>;

    if (this.config.options.secure) {
      adapter = (
        await import('../../adapters/secure-renderer-transport.adapter')
      ).SecureRendererTransportAdapter;
    } else {
      adapter = (await import('../../adapters/renderer-transport.adapter'))
        .RendererTransportAdapter;
    }

    this.container.bind(Symbols.IpcTransport).to(adapter).inSingletonScope();
  }
}
