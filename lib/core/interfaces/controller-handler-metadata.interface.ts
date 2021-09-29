import { ClassType } from '../types/class.type';
import { MessageHandler } from '../types/message-handler.type';
import { HandlerParamMetadata } from './handler-param-metadata.interface';
import Middleware from './middleware.interface';

export interface ControllerHandlerMetadata {
  controller: Record<keyof unknown, unknown>;
  handler: MessageHandler;
  middleware: (ClassType<Middleware> | Middleware)[];
  paramsMetadata: HandlerParamMetadata<any>[];
}
