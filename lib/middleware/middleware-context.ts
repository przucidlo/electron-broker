import { injectable } from 'inversify';
import { BrokerEventData } from '../interfaces/broker-event-data.interface';
import { MessageHandler } from '../types/message-handler.type';

@injectable()
export class MiddlewareContext {
  args: BrokerEventData;
  messageHandler: MessageHandler;
}
