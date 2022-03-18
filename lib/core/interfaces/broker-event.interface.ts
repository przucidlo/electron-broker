export interface BrokerEvent<T = unknown> {
  type: 'REQUEST' | 'RESPONSE';
  eventId: string;
  pattern: string;
  data: T;
}

export default BrokerEvent;
