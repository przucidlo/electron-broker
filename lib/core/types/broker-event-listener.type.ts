import { BrokerEvent } from '../interfaces/broker-event.interface';

export type BrokerEventListener = (brokerEvent: BrokerEvent) => void;
