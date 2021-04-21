import { ipcMain, IpcMainEvent } from 'electron';
import { BrokerEvent } from '../../../interfaces/broker-event.interface';
import { ListenerAdapter } from '../listener-adapter.interface';

export class BrokerListener implements ListenerAdapter {
  private listener: (event: IpcMainEvent, response: BrokerEvent) => void;
  private pattern: string;

  public listen(pattern: string, listener: (response: BrokerEvent) => void): void {
    this.pattern = pattern;

    this.listener = (event, response) => {
      listener(response);
    };

    ipcMain.on(this.pattern, this.listener);
  }

  public removeListener(): void {
    ipcMain.removeListener(this.pattern, this.listener);
  }
}
