import { BrokerEventData } from './broker-event-data.interface';

export interface HandlerParamMetadata<T extends unknown> {
  index: number;
  options?: T;
  type: () => unknown;
  method: (options: T, eventData: BrokerEventData) => void;
}
