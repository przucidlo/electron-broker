import { BrokerEventData } from './broker-event-data.interface';

export interface BrokerEvent {
  pattern: 'BROKER_EVENT';
  data: BrokerEventData;
}
