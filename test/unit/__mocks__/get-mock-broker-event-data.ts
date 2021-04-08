import { BrokerEventData } from '../../../lib/interfaces/broker-event-data.interface';

export function getMockBrokerEventData(): BrokerEventData {
  return {
    type: 'REQUEST',
    data: {},
    eventId: '0',
    pattern: 'test',
  };
}
