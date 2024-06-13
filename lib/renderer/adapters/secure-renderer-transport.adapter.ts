import { injectable } from 'inversify';
import { ClientIpcTransport } from '../../core/interfaces/client-ipc-transport.interface';
import { MessageHandler } from '../../core/types/message-handler.type';
import PreloadFileError from '../errors/preload-file.error';

interface BrokerIpcBridge {
  send: (pattern: string, data: unknown) => void;
  on: (pattern: string, handler: MessageHandler) => void;
  removeListener: (pattern: string, handler: MessageHandler) => void;
}

@injectable()
export class SecureRendererTransportAdapter implements ClientIpcTransport {
  private bridge: BrokerIpcBridge;

  constructor() {
    this.checkPreloadProcedure();
  }

  private checkPreloadProcedure() {
    this.bridge = globalThis._brokerIpcBridge;

    if (
      !this.bridge ||
      !this.bridge.send ||
      !this.bridge.removeListener ||
      !this.bridge.on
    ) {
      throw new PreloadFileError();
    }
  }

  public send(pattern: string, data: unknown): void {
    this.bridge.send(pattern, data);
  }

  public register(pattern: string, handler: MessageHandler): void {
    this.bridge.on(pattern, handler);
  }

  public unregister(pattern: string, handler: MessageHandler): void {
    this.bridge.removeListener(pattern, handler);
  }
}
