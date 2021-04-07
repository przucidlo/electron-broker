import { BrokerEventData } from '../interfaces/broker-event-data.interface';
import { ExecutionContext } from '../middleware/execution-context';
import { MessageHandler } from '../types/message-handler.type';

export type MiddlewareContextFactory = (messageHandler: MessageHandler, data: BrokerEventData) => ExecutionContext;
