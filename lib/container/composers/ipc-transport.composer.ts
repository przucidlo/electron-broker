import { ChildProcess } from 'child_process';
import { BrokerMainAdapter } from '../../adapters/broker/broker-main.adapter';
import { BrokerProcessAdapter } from '../../adapters/broker/broker-process.adapter';
import { BrokerRendererAdapter } from '../../adapters/broker/broker-renderer.adapter';
import { MainTransportAdapter } from '../../adapters/client/main-transport.adapter';
import { ProcessTransportAdapter } from '../../adapters/client/process-transport.adapter';
import { RendererTransportAdapter } from '../../adapters/client/renderer-transport.adapter';
import { DoveMode } from '../../constants/dove-mode.enum';
import { Symbols } from '../../constants/symbols';
import { IpcRendererSendFunction } from '../../types/ipc-renderer-send-function.type';
import { ContainerConfiguarableComposer } from '../abstract/container-configurable-composer';

export class IpcTransportComposer extends ContainerConfiguarableComposer {
  public compose(): void {
    switch (this.config.mode) {
      case DoveMode.PROCESS:
        this.container.bind(Symbols.IpcTransport).to(ProcessTransportAdapter).inSingletonScope();
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
      this.bindRendererAdapters(this.config.options.rendererSend);
      this.container.bind(Symbols.BrokerIpcTransport).to(BrokerMainAdapter);
    }
  }

  private bindProcessAdapters(processes: ChildProcess[]): void {
    for (const process of processes) {
      this.container.bind(Symbols.BrokerIpcTransport).toConstantValue(new BrokerProcessAdapter(process));
    }
  }

  private bindRendererAdapters(rendererSend: IpcRendererSendFunction): void {
    this.container.bind(Symbols.BrokerIpcTransport).toConstantValue(new BrokerRendererAdapter(rendererSend));
  }
}
