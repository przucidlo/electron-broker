import { inject, injectable, multiInject } from 'inversify';
import { BrokerProcessAdapter } from '../adapters/broker/broker-process.adapter';
import { BrokerRendererAdapter } from '../adapters/broker/broker-renderer.adapter';
import { BROKER_EVENT } from '../constants/channels';
import { Symbols } from '../constants/symbols';
import { BrokerEvent } from '../interfaces/broker-event.interface';
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
    adapter.register(BROKER_EVENT, (data: BrokerEvent) => {
      this.eventDistributor.broadcast(data);
    });
  }

  private registerRendererAdapter(adapter: BrokerRendererAdapter): void {
    adapter.register(BROKER_EVENT, (event: any, data: BrokerEvent) => {
      this.eventDistributor.broadcast(data);
    });
  }
}
