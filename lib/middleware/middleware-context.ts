import { injectable } from 'inversify';
import { BrokerEventData } from '../interfaces/broker-event-data.interface';
import { MessageHandler } from '../interfaces/message-handler.type';

@injectable()
export class MiddlewareContext {
  args: BrokerEventData;
  messageHandler: MessageHandler;
}
