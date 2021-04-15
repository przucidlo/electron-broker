import 'reflect-metadata';
import { injectable } from 'inversify';
import { PATTERN_METADATA, HANDLER_ARGS_METADATA, MIDDLEWARE_METADATA } from '../constants/decorators';
import { ControllerHandlerMetadata } from '../interfaces/controller-handler-metadata.interface';
import { MessageHandler } from '../types/message-handler.type';
import { AbstractMetadataReader } from './abstract-metadata.reader';
import Middleware from '../interfaces/middleware.interface';
import { ClassType } from '../types/class.type';

@injectable()
export class ControllerHandlersMetadataReader extends AbstractMetadataReader {
  public read(controller: Record<any, unknown>): Record<string, ControllerHandlerMetadata> {
    const messageHandlers: Record<string, ControllerHandlerMetadata> = {};

    for (const handlerName of this.getControllerProperties(controller)) {
      const messageHandler = (controller as any)[handlerName];

      if (this.isReadable(messageHandler, handlerName)) {
        const pattern = this.getHandlerPattern(controller, handlerName);

        if (this.isMessageHandler(pattern)) {
          const paramsMetadata = this.getHandlerParamsMetadata(controller, handlerName);

          messageHandlers[pattern] = {
            controller: controller,
            handler: messageHandler,
            paramsMetadata: paramsMetadata ? paramsMetadata : [],
            middleware: this.getHandlerMiddleware(controller, handlerName),
          };
        }
      }
    }

    return messageHandlers;
  }

  private getControllerProperties(controller: unknown): string[] {
    return Object.getOwnPropertyNames(Object.getPrototypeOf(controller));
  }

  private isReadable(handler: MessageHandler, handlerName: string): boolean {
    return this.isFunction(handler) && handlerName !== 'constructor';
  }

  private getHandlerPattern(controller: unknown, handlerName: string) {
    return Reflect.getMetadata(PATTERN_METADATA, controller[handlerName]);
  }

  private getHandlerParamsMetadata(controller: unknown, handlerName: string) {
    return Reflect.getMetadata(HANDLER_ARGS_METADATA, controller[handlerName]);
  }

  private getHandlerMiddleware(controller: unknown, handlerName: string): ClassType<Middleware>[] {
    const controllerMiddleware = Reflect.getMetadata(MIDDLEWARE_METADATA, controller);
    const handlerMiddleware = Reflect.getMetadata(MIDDLEWARE_METADATA, controller[handlerName]);

    let middleware: ClassType<Middleware>[] = [];

    if (controllerMiddleware) {
      middleware = [...controllerMiddleware];
    }

    if (handlerMiddleware) {
      middleware = [...middleware, ...handlerMiddleware];
    }

    return middleware;
  }

  private isMessageHandler(pattern: string): boolean {
    return pattern !== undefined;
  }
}
