import { BrokerEventSubscriber } from '../client/event-subscriber/broker-event-subscriber';
import { BrokerEventListener } from './broker-event-listener.type';

export type BrokerEventSubscriberFactory = (
  pattern: string,
  listener: BrokerEventListener,
) => BrokerEventSubscriber;
