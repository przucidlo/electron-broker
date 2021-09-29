import { Symbols } from '../../../constants/symbols';
import { IpcTransport } from '../../../interfaces/ipc-transport.interface';
import { ClassType } from '../../../types/class.type';
import { ContainerConfiguarableComposer } from '../../abstract/container-configurable-composer';

export class RendererIpcTransportComposer extends ContainerConfiguarableComposer {
  public async compose(): Promise<void> {
    if (this.config.mode === 'CLIENT') {
      let adapter: ClassType<IpcTransport>;

      if (this.config.options.secure) {
        adapter = (
          await import(
            './../../../adapters/client/secure-renderer-transport.adapter'
          )
        ).SecureRendererTransportAdapter;
      } else {
        adapter = (
          await import('./../../../adapters/client/renderer-transport.adapter')
        ).RendererTransportAdapter;
      }

      this.container.bind(Symbols.IpcTransport).to(adapter).inSingletonScope();
    }
  }
}
