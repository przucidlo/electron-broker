import { BrowserWindow } from 'electron';
import { Mode } from '../../..';
import { BrokerMainAdapter } from '../../../core/adapters/broker/broker-main.adapter';
import { BrokerProcessAdapter } from '../../../core/adapters/broker/broker-process.adapter';
import { BrokerRendererAdapter } from '../../../core/adapters/broker/broker-renderer.adapter';
import { MainTransportAdapter } from '../../../core/adapters/client/main-transport.adapter';
import { Symbols } from '../../../core/constants/symbols';
import IpcProcess from '../../../core/process/ipc-process';
import { ContainerConfiguarableComposer } from '../../../core/container/abstract/container-configurable-composer';
import { ChildProcess } from 'child_process';

export class IpcTransportMainComposer extends ContainerConfiguarableComposer {
  public compose(): void {
    this.container
      .bind(Symbols.IpcTransport)
      .to(MainTransportAdapter)
      .inSingletonScope();
    this.container
      .bind(Symbols.BrokerIpcTransport)
      .to(BrokerMainAdapter)
      .inSingletonScope();
    this.bindBrokerIpcTransportAdapters();
  }

  private bindBrokerIpcTransportAdapters(): void {
    if (this.config.mode === Mode.BROKER) {
      const { browserWindows, processes } = this.config.options;

      for (const adapterSource of [...browserWindows, ...processes]) {
        const adapter = this.createBrokerIpcTransportAdapter(adapterSource);

        this.container
          .bind(Symbols.BrokerIpcTransport)
          .toConstantValue(adapter);
      }
    }
  }

  private createBrokerIpcTransportAdapter(
    source: ChildProcess | BrowserWindow,
  ) {
    if (source instanceof BrowserWindow) {
      return new BrokerRendererAdapter(source);
    }
    return new BrokerProcessAdapter(new IpcProcess(source));
  }
}
