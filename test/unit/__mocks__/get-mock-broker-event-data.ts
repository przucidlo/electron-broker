import { BrokerEvent } from '../../../lib/interfaces/broker-event.interface';

export function getMockBrokerEventData(): BrokerEvent {
  return {
    type: 'REQUEST',
    data: {},
    eventId: '0',
    pattern: 'test',
  };
}
