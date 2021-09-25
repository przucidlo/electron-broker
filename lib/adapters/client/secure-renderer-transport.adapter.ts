import { injectable } from 'inversify';
import { IpcTransport } from '../../interfaces/ipc-transport.interface';
import { MessageHandler } from '../../types/message-handler.type';

@injectable()
export class SecureRendererTransportAdapter implements IpcTransport {
  send(pattern: string, data: unknown): void {
    globalThis.broker.send(pattern, data);
  }
  register(pattern: string, handler: MessageHandler): void {
    globalThis.broker.on(pattern, handler);
  }
}
