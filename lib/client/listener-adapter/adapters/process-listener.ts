import { BrokerEventData } from '../../../interfaces/broker-event-data.interface';
import { IpcProcessMessage } from '../../../process/ipc-process-message.interface';
import { ListenerAdapter } from '../listener-adapter.interface';

export class ProcessListener implements ListenerAdapter {
  private listener: (response: IpcProcessMessage) => void;

  public listen(pattern: string, listener: (response: BrokerEventData) => void): void {
    this.listener = this.injectPatternMatcher(pattern, listener);

    process.on('message', this.listener);
  }

  private injectPatternMatcher(pattern: string, listener: (response: BrokerEventData) => void) {
    return (response: IpcProcessMessage) => {
      if (pattern === response.channelName) {
        listener(<BrokerEventData>response.payload);
      }
    };
  }

  public removeListener(): void {
    (<NodeJS.EventEmitter>process).removeListener('message', this.listener);
  }
}
