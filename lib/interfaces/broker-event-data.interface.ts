export interface BrokerEventData {
  type: 'REQUEST' | 'RESPONSE';
  eventId: string;
  pattern: string;
  pid: number;
  data: any;
}

export function isBrokerEventData(arg: any): arg is BrokerEventData {
  return arg.pid !== undefined && arg.eventId !== undefined;
}
