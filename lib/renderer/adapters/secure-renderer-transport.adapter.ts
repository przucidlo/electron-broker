import { injectable } from 'inversify';
import { ClientIpcTransport } from '../../core/interfaces/client-ipc-transport.interface';
import { MessageHandler } from '../../core/types/message-handler.type';
import PreloadFileError from '../errors/preload-file.error';

@injectable()
export class SecureRendererTransportAdapter implements ClientIpcTransport {
  constructor() {
    this.checkPreloadProcedure();
  }

  private checkPreloadProcedure() {
    const broker = globalThis.broker;

    if (!broker || !broker.send || !broker.removeListener || !broker.on) {
      throw new PreloadFileError();
    }
  }

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
