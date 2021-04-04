export interface BrokerEventData {
  type: 'REQUEST' | 'RESPONSE';
  eventId: string;
  pattern: string;
  data: unknown;
}

// eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
export function isBrokerEventData(arg: any): arg is BrokerEventData {
  return arg.eventId !== undefined;
}
