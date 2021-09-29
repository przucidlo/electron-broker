import { v4 as uuid } from 'uuid';
import { BrokerEvent } from '../interfaces/broker-event.interface';

export class BrokerEventFactory {
  public static createBrokerEvent(pattern: string, data: unknown): BrokerEvent {
    return {
      type: 'REQUEST',
      eventId: uuid(),
      pattern: pattern,
      data: data,
    };
  }

  public static createBrokerEventAsResponse(
    base: BrokerEvent,
    data: unknown,
  ): BrokerEvent {
    return {
      ...base,
      type: 'RESPONSE',
      data: data,
    };
  }
}
