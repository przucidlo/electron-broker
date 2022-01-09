import { BrowserWindow } from 'electron';
import { BrokerMainAdapter } from '../../adapters/broker-main.adapter';
import { BrokerProcessAdapter } from '../../adapters/broker-process.adapter';
import { BrokerRendererAdapter } from '../../adapters/broker-renderer.adapter';
import { MainTransportAdapter } from '../../adapters/main-transport.adapter';
import { Symbols } from '../../../core/constants/symbols';
import IpcProcess from '../../../core/process/ipc-process';
import { ContainerConfiguarableComposer } from '../../../core/container/abstract/container-configurable-composer';
import { ChildProcess } from 'child_process';
import { BrokerConfig } from '../../../core/interfaces/options/broker-config.interface';

export class MainIpcTransportComposer extends ContainerConfiguarableComposer<BrokerConfig> {
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
    const { browserWindows, processes } = this.config.options;

    for (const adapterSource of [...browserWindows, ...processes]) {
      const adapter = this.createBrokerIpcTransportAdapter(adapterSource);

      this.container.bind(Symbols.BrokerIpcTransport).toConstantValue(adapter);
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
