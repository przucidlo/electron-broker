export interface BrokerEvent {
  type: 'REQUEST' | 'RESPONSE';
  eventId: string;
  pattern: string;
  data: unknown;
}
