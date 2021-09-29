import { ipcRenderer } from 'electron';
import { injectable } from 'inversify';
import { IpcTransport } from '../../interfaces/ipc-transport.interface';
import { MessageHandler } from '../../types/message-handler.type';

@injectable()
export class RendererTransportAdapter implements IpcTransport {
  public send(pattern: string, data: unknown): void {
    ipcRenderer.send(pattern, data);
  }

  public register(pattern: string, handler: MessageHandler): void {
    ipcRenderer.on(pattern, (event, args: any[]) => {
      handler(args[0]);
    });
  }
}
