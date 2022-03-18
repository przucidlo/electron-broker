import { BrokerEventSubscriber } from '../client/event-subscriber/broker-event-subscriber';
import { BrokerEventListener } from './broker-event-listener.type';

export type BrokerEventSubscriberFactory<T = unknown> = (
  pattern: string,
  listener: BrokerEventListener<T>,
) => BrokerEventSubscriber;
