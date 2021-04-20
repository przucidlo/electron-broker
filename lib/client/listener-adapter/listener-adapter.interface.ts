import { BrokerEvent } from '../../interfaces/broker-event-data.interface';

export interface ListenerAdapter {
  listen(pattern: string, listener: (response: BrokerEvent) => void): void;
  removeListener(): void;
}
