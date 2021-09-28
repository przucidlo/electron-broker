import { BrowserWindow } from 'electron';
import { Mode } from '../../..';
import { BrokerMainAdapter } from '../../../adapters/broker/broker-main.adapter';
import { BrokerProcessAdapter } from '../../../adapters/broker/broker-process.adapter';
import { BrokerRendererAdapter } from '../../../adapters/broker/broker-renderer.adapter';
import { MainTransportAdapter } from '../../../adapters/client/main-transport.adapter';
import { Symbols } from '../../../constants/symbols';
import IpcProcess from '../../../process/ipc-process';
import { ContainerConfiguarableComposer } from '../../abstract/container-configurable-composer';
import { ChildProcess } from 'child_process';

export class BrokerIpcTransportComposer extends ContainerConfiguarableComposer {
  public compose(): void {
    this.container
      .bind(Symbols.IpcTransport)
      .to(MainTransportAdapter)
      .inSingletonScope();
    this.container.bind(Symbols.BrokerIpcTransport).to(BrokerMainAdapter);
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
