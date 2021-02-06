import { MiddlewareContext } from '../middleware/middleware-context';
import { BrokerEventData } from './broker-event-data.interface';
import { MessageHandler } from './message-handler.type';

export type MiddlewareContextFactory = (messageHandler: MessageHandler, data: BrokerEventData) => MiddlewareContext;
