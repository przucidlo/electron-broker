import { inject, injectable, multiInject } from 'inversify';
import { BrokerProcessAdapter } from '../adapters/broker-process.adapter';
import { BrokerRendererAdapter } from '../adapters/broker-renderer.adapter';
import { BROKER_EVENT } from '../constants/constants';
import { Symbols } from '../constants/symbols';
import { BrokerEventData } from '../interfaces/broker-event-data.interface';
import { IpcTransport } from '../interfaces/ipc-transport.interface';
import { EventDistributor } from './event-distributor';

@injectable()
export class EventDistributorAdapterRegistrator {
  constructor(
    @multiInject(Symbols.BrokerIpcTransport) private adapters: IpcTransport[],
    @inject(EventDistributor) private eventDistributor: EventDistributor,
  ) {}

  public register(): void {
    for (const adapter of this.adapters) {
      if (adapter instanceof BrokerProcessAdapter) {
        this.registerProcessAdapter(adapter);
      }
      if (adapter instanceof BrokerRendererAdapter) {
        this.registerRendererAdapter(adapter);
      }
    }
  }

  private registerProcessAdapter(adapter: BrokerProcessAdapter): void {
    adapter.register(BROKER_EVENT, (data: BrokerEventData) => {
      this.eventDistributor.broadcast(data);
    });
  }

  private registerRendererAdapter(adapter: BrokerRendererAdapter): void {
    adapter.register(BROKER_EVENT, (event: any, data: BrokerEventData) => {
      this.eventDistributor.broadcast(data);
    });
  }
}
