import { BrokerEvent } from '../interfaces/broker-event.interface';

export type BrokerEventListener<T = unknown> = (
  brokerEvent: BrokerEvent<T>,
) => void;
