import { ProcessTransportAdapter } from '../../../core/adapters/client/process-transport.adapter';
import { Symbols } from '../../../core/constants/symbols';
import IpcProcess from '../../../core/process/ipc-process';
import { ContainerConfiguarableComposer } from '../../../core/container/abstract/container-configurable-composer';

export class IpcTransportProcessComposer extends ContainerConfiguarableComposer {
  public compose(): void {
    this.container
      .bind(Symbols.IpcTransport)
      .toConstantValue(new ProcessTransportAdapter(new IpcProcess()));
  }
}
