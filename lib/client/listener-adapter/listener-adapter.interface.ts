import { BrokerEvent } from '../../interfaces/broker-event.interface';

export interface ListenerAdapter {
  listen(pattern: string, listener: (response: BrokerEvent) => void): void;
  removeListener(): void;
}
