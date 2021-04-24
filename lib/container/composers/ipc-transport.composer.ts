import { ChildProcess } from 'child_process';
import { BrowserWindow } from 'electron';
import { BrokerMainAdapter } from '../../adapters/broker/broker-main.adapter';
import { BrokerProcessAdapter } from '../../adapters/broker/broker-process.adapter';
import { BrokerRendererAdapter } from '../../adapters/broker/broker-renderer.adapter';
import { MainTransportAdapter } from '../../adapters/client/main-transport.adapter';
import { ProcessTransportAdapter } from '../../adapters/client/process-transport.adapter';
import { RendererTransportAdapter } from '../../adapters/client/renderer-transport.adapter';
import { DoveMode } from '../../constants/dove-mode.enum';
import { Symbols } from '../../constants/symbols';
import IpcProcess from '../../process/ipc-process';
import { ContainerConfiguarableComposer } from '../abstract/container-configurable-composer';

export class IpcTransportComposer extends ContainerConfiguarableComposer {
  public compose(): void {
    switch (this.config.mode) {
      case DoveMode.PROCESS:
        this.container.bind(Symbols.IpcTransport).toConstantValue(new ProcessTransportAdapter(new IpcProcess()));
        break;
      case DoveMode.RENDERER:
        this.container.bind(Symbols.IpcTransport).to(RendererTransportAdapter).inSingletonScope();
        break;
      case DoveMode.BROKER:
        this.bindBrokerIpcTransport();
        this.container.bind(Symbols.IpcTransport).to(MainTransportAdapter).inSingletonScope();
        break;
    }
  }

  private bindBrokerIpcTransport(): void {
    if (this.config.mode === DoveMode.BROKER) {
      this.bindProcessAdapters(this.config.options.processes);
      this.bindRendererAdapters(this.config.options.browserWindows);
      this.container.bind(Symbols.BrokerIpcTransport).to(BrokerMainAdapter);
    }
  }

  private bindProcessAdapters(processes: ChildProcess[]): void {
    for (const process of processes) {
      const ipcProcess = new IpcProcess(process);

      this.container.bind(Symbols.BrokerIpcTransport).toConstantValue(new BrokerProcessAdapter(ipcProcess));
    }
  }

  private bindRendererAdapters(browserWindows: BrowserWindow[]): void {
    for (const browserWindow of browserWindows) {
      this.container.bind(Symbols.BrokerIpcTransport).toConstantValue(new BrokerRendererAdapter(browserWindow));
    }
  }
}
