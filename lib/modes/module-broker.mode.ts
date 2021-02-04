import { injectable, multiInject } from 'inversify';
import { BrokerProcessAdapter } from '../adapters/broker-process.adapter';
import { BrokerRendererAdapter } from '../adapters/broker-renderer.adapter';
import { BROKER_EVENT } from '../constants/constants';
import { Symbols } from '../constants/symbols';
import { BrokerEventData } from '../interfaces/broker-event-data.interface';
import { IpcTransport } from '../interfaces/ipc-transport.interface';
import { ModuleMode } from '../interfaces/module-mode.interface';

@injectable()
export class ModuleBrokerMode implements ModuleMode {
  private processAdapters: BrokerProcessAdapter[] = [];
  private rendererAdapter: BrokerRendererAdapter;

  constructor(@multiInject(Symbols.IpcTransport) adapters: IpcTransport[]) {
    this.sortAdapters(adapters);
  }

  private sortAdapters(adapters: IpcTransport[]): void {
    for (let adapter of adapters) {
      if (adapter instanceof BrokerProcessAdapter) {
        this.processAdapters.push(adapter);
      }
      if (adapter instanceof BrokerRendererAdapter) {
        this.rendererAdapter = adapter;
      }
    }
  }

  public start(): void {
    this.registerProcessAdapters();
    this.registerRendererAdapters();
  }

  private registerProcessAdapters(): void {
    for (let adapter of this.processAdapters) {
      adapter.register(BROKER_EVENT, (data: BrokerEventData) => {
        this.distributeEvent(data);
      });
    }
  }

  private registerRendererAdapters(): void {
    this.rendererAdapter.register(BROKER_EVENT, (event: any, data: BrokerEventData) => {
      this.distributeEvent(data);
    });
  }

  private distributeEvent(brokerEvent: BrokerEventData): void {
    for (let adapter of this.processAdapters) {
      // console.log('-----------In ModuleBroker:-----------');
      // console.log(brokerEvent);
      // console.log('--------------------------------------');

      adapter.send(brokerEvent.pattern, brokerEvent);
    }
    this.rendererAdapter.send(brokerEvent.pattern, brokerEvent);
  }
}
