import { BrokerResponseListener } from '../client/response-listener/broker-response-listener';
import { BrokerEvent } from '../interfaces/broker-event.interface';

export type BrokerResponseListenerFactory = (
  brokerEvent: BrokerEvent,
) => BrokerResponseListener;
