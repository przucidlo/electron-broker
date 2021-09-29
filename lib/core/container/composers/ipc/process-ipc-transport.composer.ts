import { ProcessTransportAdapter } from '../../../adapters/client/process-transport.adapter';
import { Symbols } from '../../../constants/symbols';
import IpcProcess from '../../../process/ipc-process';
import { ContainerConfiguarableComposer } from '../../abstract/container-configurable-composer';

export class ProcessIpcTransportComposer extends ContainerConfiguarableComposer {
  public compose(): void {
    this.container
      .bind(Symbols.IpcTransport)
      .toConstantValue(new ProcessTransportAdapter(new IpcProcess()));
  }
}
