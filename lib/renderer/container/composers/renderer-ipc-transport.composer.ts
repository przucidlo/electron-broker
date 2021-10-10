import { Symbols } from '../../../core/constants/symbols';
import { IpcTransport } from '../../../core/interfaces/ipc-transport.interface';
import { ClassType } from '../../../core/types/class.type';
import { ContainerConfiguarableComposer } from '../../../core/container/abstract/container-configurable-composer';

export class RendererIpcTransportComposer extends ContainerConfiguarableComposer {
  public async compose(): Promise<void> {
    if (this.config.mode === 'CLIENT') {
      let adapter: ClassType<IpcTransport>;

      if (this.config.options.secure) {
        adapter = (
          await import(
            '../../../core/adapters/client/secure-renderer-transport.adapter'
          )
        ).SecureRendererTransportAdapter;
      } else {
        adapter = (
          await import(
            '../../../core/adapters/client/renderer-transport.adapter'
          )
        ).RendererTransportAdapter;
      }

      this.container.bind(Symbols.IpcTransport).to(adapter).inSingletonScope();
    }
  }
}
