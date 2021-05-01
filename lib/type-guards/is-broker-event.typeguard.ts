import { BrokerEvent } from '../interfaces/broker-event.interface';

export function isBrokerEvent(target: any): target is BrokerEvent {
  return target && target.type !== undefined && target.eventId !== undefined && target.pattern !== undefined;
}
