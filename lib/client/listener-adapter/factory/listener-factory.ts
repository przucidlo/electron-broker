import { ListenerAdapter } from '../listener-adapter.interface';

export class ListenerFactory {
  public static async createListener(): Promise<ListenerAdapter> {
    let listenerAdapter: ListenerAdapter;

    switch (process.type) {
      case 'renderer':
        listenerAdapter = new (
          await import('../adapters/renderer-listener')
        ).RendererListener();
        break;
      case 'browser':
        listenerAdapter = new (
          await import('../adapters/broker-listener')
        ).BrokerListener();
        break;
      default:
        listenerAdapter = new (
          await import('../adapters/process-listener')
        ).ProcessListener();
        break;
    }

    return listenerAdapter;
  }
}
