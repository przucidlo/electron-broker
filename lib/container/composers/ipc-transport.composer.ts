import { ChildProcess } from 'child_process';
import { BrowserWindow } from 'electron';
import { BrokerMainAdapter } from '../../adapters/broker/broker-main.adapter';
import { BrokerProcessAdapter } from '../../adapters/broker/broker-process.adapter';
import { BrokerRendererAdapter } from '../../adapters/broker/broker-renderer.adapter';
import { MainTransportAdapter } from '../../adapters/client/main-transport.adapter';
import { ProcessTransportAdapter } from '../../adapters/client/process-transport.adapter';
import { RendererTransportAdapter } from '../../adapters/client/renderer-transport.adapter';
import { Mode } from '../../constants/mode.enum';
import { Symbols } from '../../constants/symbols';
import IpcProcess from '../../process/ipc-process';
import { ContainerConfiguarableComposer } from '../abstract/container-configurable-composer';

export class IpcTransportComposer extends ContainerConfiguarableComposer {
  public compose(): void {
    switch (process.type) {
      case 'renderer':
        this.container
          .bind(Symbols.IpcTransport)
          .to(RendererTransportAdapter)
          .inSingletonScope();
        break;
      case 'browser':
        this.container
          .bind(Symbols.IpcTransport)
          .to(MainTransportAdapter)
          .inSingletonScope();
        this.container.bind(Symbols.BrokerIpcTransport).to(BrokerMainAdapter);
        this.bindBrokerIpcTransportAdapters();
        break;
      default:
        this.container
          .bind(Symbols.IpcTransport)
          .toConstantValue(new ProcessTransportAdapter(new IpcProcess()));
        break;
    }
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
