import { BrokerEvent } from '../../../lib/core/interfaces/broker-event.interface';

export function getMockBrokerEventData(): BrokerEvent {
  return {
    type: 'REQUEST',
    data: {},
    eventId: '0',
    pattern: 'test',
  };
}
