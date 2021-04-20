import { ipcRenderer, IpcRendererEvent } from 'electron';
import { BrokerEvent } from '../../../interfaces/broker-event-data.interface';
import { ListenerAdapter } from '../listener-adapter.interface';

export class RendererListener implements ListenerAdapter {
  private listener: (event: IpcRendererEvent, response: BrokerEvent) => void;
  private pattern: string;

  public listen(pattern: string, listener: (response: BrokerEvent) => void): void {
    this.pattern = pattern;

    this.listener = (event, response) => {
      listener(response);
    };

    ipcRenderer.on(this.pattern, this.listener);
  }

  public removeListener(): void {
    ipcRenderer.removeListener(this.pattern, this.listener);
  }
}
