import { BrokerListener } from '../adapters/broker-listener';
import { ProcessListener } from '../adapters/process-listener';
import { RendererListener } from '../adapters/renderer-listener';
import { ListenerAdapter } from '../listener-adapter.interface';

export class ListenerFactory {
  public static createListener(): ListenerAdapter {
    switch (process.type) {
      case 'renderer':
        return new RendererListener();
      case 'browser':
        return new BrokerListener();
      default:
        return new ProcessListener();
    }
  }
}
