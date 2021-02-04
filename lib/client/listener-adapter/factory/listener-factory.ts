import { ProcessListener } from '../adapters/process-listener';
import { RendererListener } from '../adapters/renderer-listener';
import { ListenerAdapter } from '../listener-adapter.interface';

export class ListenerFactory {
  public static createListener(): ListenerAdapter {
    switch (process.type) {
      case 'renderer':
        return new RendererListener();
      case 'browser':
        throw new Error('Not yet implemented');
      default:
        return new ProcessListener();
    }
  }
}
