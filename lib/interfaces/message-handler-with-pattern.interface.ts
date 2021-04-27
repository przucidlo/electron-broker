import { MessageHandler } from '../types/message-handler.type';

export interface MessageHandlerWithPattern {
  pattern: string;
  handler: MessageHandler;
}
