import { BrokerEvent } from '../../../lib/core/interfaces/broker-event.interface';

export function getMockBrokerEventData(): BrokerEvent<any> {
  return {
    type: 'REQUEST',
    data: {},
    eventId: '0',
    pattern: 'test',
  };
}
