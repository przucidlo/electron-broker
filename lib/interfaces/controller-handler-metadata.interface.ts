import { MessageHandler } from '../types/message-handler.type';
import { HandlerParamMetadata } from './handler-param-metadata.interface';

export interface ControllerHandlerMetadata {
  // eslint-disable-next-line @typescript-eslint/ban-types
  controller: Function;
  handler: MessageHandler;
  paramsMetadata: HandlerParamMetadata<any>[];
}
