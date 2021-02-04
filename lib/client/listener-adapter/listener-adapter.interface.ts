import { BrokerEventData } from '../../interfaces/broker-event-data.interface';

export interface ListenerAdapter {
  listen(pattern: string, listener: (response: BrokerEventData) => void): void;
  removeListener(): void;
}
