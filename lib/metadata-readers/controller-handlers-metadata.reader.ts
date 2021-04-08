import 'reflect-metadata';
import { injectable } from 'inversify';
import { PATTERN_METADATA, HANDLER_ARGS_METADATA } from '../constants/decorators';
import { ControllerHandlerMetadata } from '../interfaces/controller-handler-metadata.interface';
import { MessageHandler } from '../types/message-handler.type';
import { AbstractMetadataReader } from './abstract-metadata.reader';

@injectable()
export class ControllerHandlersMetadataReader extends AbstractMetadataReader {
  public read<T extends Record<any, unknown>, U extends keyof T>(
    controller: U,
  ): Record<string, ControllerHandlerMetadata> {
    const messageHandlers: Record<string, ControllerHandlerMetadata> = {};

    for (const handlerName of this.getControllerProperties(controller)) {
      const messageHandler = (controller as any)[handlerName].bind(controller);

      if (this.isReadable(messageHandler, handlerName)) {
        const pattern = this.getHandlerPattern(controller, handlerName);

        if (this.isMessageHandler(pattern)) {
          const paramsMetadata = this.getHandlerParamsMetadata(controller, handlerName);

          messageHandlers[pattern] = {
            controller: controller.constructor,
            handler: messageHandler,
            paramsMetadata: paramsMetadata ? paramsMetadata : [],
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
    return Reflect.getMetadata(PATTERN_METADATA, controller, handlerName);
  }

  private getHandlerParamsMetadata(controller: unknown, handlerName: string) {
    return Reflect.getMetadata(HANDLER_ARGS_METADATA, controller, handlerName);
  }

  private isMessageHandler(pattern: string): boolean {
    return pattern !== undefined;
  }
}
