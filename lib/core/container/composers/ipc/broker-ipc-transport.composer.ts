import { BrowserWindow } from 'electron';
import { Mode } from '../../../..';
import { BrokerMainAdapter } from '../../../adapters/broker/broker-main.adapter';
import { MainTransportAdapter } from '../../../adapters/client/main-transport.adapter';
import { Symbols } from '../../../constants/symbols';
import { ContainerConfiguarableComposer } from '../../abstract/container-configurable-composer';
import { ChildProcess } from 'child_process';
import IpcProcess from '../../../process/ipc-process';
import { BrokerProcessAdapter } from '../../../adapters/broker/broker-process.adapter';
import { BrokerRendererAdapter } from '../../../adapters/broker/broker-renderer.adapter';

export class BrokerIpcTransportComposer extends ContainerConfiguarableComposer {
  public compose(): void {
    this.bindBrokerIpcTransport();

    this.container
      .bind(Symbols.IpcTransport)
      .to(MainTransportAdapter)
      .inSingletonScope();
  }

  private bindBrokerIpcTransport(): void {
    if (this.config.mode === Mode.BROKER) {
      this.bindProcessAdapters(this.config.options.processes);
      this.bindRendererAdapters(this.config.options.browserWindows);
      this.container.bind(Symbols.BrokerIpcTransport).to(BrokerMainAdapter);
    }
  }

  private bindProcessAdapters(processes: ChildProcess[]): void {
    for (const process of processes) {
      const ipcProcess = new IpcProcess(process);

      this.container
        .bind(Symbols.BrokerIpcTransport)
        .toConstantValue(new BrokerProcessAdapter(ipcProcess));
    }
  }

  private bindRendererAdapters(browserWindows: BrowserWindow[]): void {
    for (const browserWindow of browserWindows) {
      this.container
        .bind(Symbols.BrokerIpcTransport)
        .toConstantValue(new BrokerRendererAdapter(browserWindow));
    }
  }
}
