import { v4 as uuid } from 'uuid';
import { BrokerEventData, isBrokerEventData } from '../interfaces/broker-event-data.interface';
import { BrokerEvent } from '../interfaces/broker-event.interface';

export class BrokerEventConverter {
  public static createOrConvert(pattern: string, data: any): BrokerEvent {
    let brokerEvent: BrokerEvent;

    if (isBrokerEventData(data)) {
      brokerEvent = this.fromBrokerEventData(data);
    } else {
      brokerEvent = this.createBrokerEvent(pattern, data);
    }

    return brokerEvent;
  }

  public static createBrokerEvent(pattern: string, data: any): BrokerEvent {
    return {
      pattern: 'BROKER_EVENT',
      data: {
        type: 'REQUEST',
        eventId: uuid(),
        pattern: pattern,
        pid: process.pid,
        data: data,
      },
    };
  }

  public static fromBrokerEventData(brokerEventData: BrokerEventData): BrokerEvent {
    return {
      pattern: 'BROKER_EVENT',
      data: brokerEventData,
    };
  }
}
