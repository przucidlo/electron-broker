import { BrokerEventData } from '../interfaces/broker-event-data.interface';
import { MiddlewareContext } from '../middleware/middleware-context';
import { MessageHandler } from '../types/message-handler.type';

export type MiddlewareContextFactory = (messageHandler: MessageHandler, data: BrokerEventData) => MiddlewareContext;
