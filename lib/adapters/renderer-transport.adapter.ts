import { ipcRenderer } from 'electron';
import { injectable } from 'inversify';
import { IpcTransport } from '../interfaces/ipc-transport.interface';

@injectable()
export class RendererTransportAdapter implements IpcTransport {
  public async send(pattern: string, data: any): Promise<any> {
    ipcRenderer.invoke(pattern, data);
  }

  public register(pattern: string, handler: any): void {
    ipcRenderer.on(pattern, (event, args: any[]) => {
      handler(args[0]);
    });
  }
}
