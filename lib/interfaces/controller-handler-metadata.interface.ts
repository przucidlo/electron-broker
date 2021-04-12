import { MessageHandler } from '../types/message-handler.type';
import { HandlerParamMetadata } from './handler-param-metadata.interface';
import { Middleware } from './middleware.interface';

export interface ControllerHandlerMetadata {
  // eslint-disable-next-line @typescript-eslint/ban-types
  controller: Function;
  handler: MessageHandler;
  middleware: Middleware[];
  paramsMetadata: HandlerParamMetadata<any>[];
}
