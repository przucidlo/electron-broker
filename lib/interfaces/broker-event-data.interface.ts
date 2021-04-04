export interface BrokerEventData {
  type: 'REQUEST' | 'RESPONSE';
  eventId: string;
  pattern: string;
  data: any;
}

export function isBrokerEventData(arg: any): arg is BrokerEventData {
  return arg.eventId !== undefined;
}
