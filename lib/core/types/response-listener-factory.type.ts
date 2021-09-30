import { ResponseListener } from '../client/response-listener/response-listener';
import { BrokerEvent } from '../interfaces/broker-event.interface';

export type ResponseListenerFactory = (
  brokerEvent: BrokerEvent,
) => ResponseListener;
