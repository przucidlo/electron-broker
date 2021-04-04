import { BrokerEventData } from '../../../interfaces/broker-event-data.interface';
import { IpcProcessPayload } from '../../../process/IpcProcessPayload';
import { ListenerAdapter } from '../listener-adapter.interface';

export class ProcessListener implements ListenerAdapter {
  private listener: (response: IpcProcessPayload) => void;

  public listen(pattern: string, listener: (response: BrokerEventData) => void): void {
    this.listener = this.injectPatternMatcher(pattern, listener);

    process.on('message', this.listener);
  }

  private injectPatternMatcher(pattern: string, listener: (response: BrokerEventData) => void) {
    return (response: IpcProcessPayload) => {
      if (pattern === response.channelName) {
        listener(<BrokerEventData>response.payload);
      }
    };
  }

  public removeListener(): void {
    (<NodeJS.EventEmitter>process).removeListener('message', this.listener);
  }
}
