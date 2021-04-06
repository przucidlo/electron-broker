import { MessageHandler } from '../types/message-handler.type';
import { HandlerParamMetadata } from './handler-param-metadata.interface';

export interface ControllerHandlerMetadata {
  handler: MessageHandler;
  paramsMetadata: HandlerParamMetadata<any>[];
}
