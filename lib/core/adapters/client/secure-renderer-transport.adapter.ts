import { injectable } from 'inversify';
import { ClientIpcTransport } from '../../interfaces/client-ipc-transport.interface';
import { MessageHandler } from '../../types/message-handler.type';

@injectable()
export class SecureRendererTransportAdapter implements ClientIpcTransport {
  public send(pattern: string, data: unknown): void {
    globalThis.broker.send(pattern, data);
  }

  public register(pattern: string, handler: MessageHandler): void {
    globalThis.broker.on(pattern, handler);
  }

  public unregister(pattern: string, handler: MessageHandler): void {
    globalThis.broker.removeListener(pattern, handler);
  }
}
