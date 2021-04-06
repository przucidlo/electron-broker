import 'reflect-metadata';
import { injectable } from 'inversify';
import { HANDLER_ARGS_METADATA, PATTERN_METADATA } from '../constants/decorators';
import { ControllerMetadata } from '../interfaces/controller-metadata.interface';
import { AbstractMetadataReader } from './abstract-metadata.reader';

@injectable()
export class ControllerMetadataReader extends AbstractMetadataReader {
  public read<T extends Record<string, unknown>>(controller: T): ControllerMetadata {
    const controllerMetadata: ControllerMetadata = {
      messageHandlers: {},
    };

    for (const propertyKey of Object.getOwnPropertyNames(Object.getPrototypeOf(controller))) {
      const messageHandler = (controller as any)[propertyKey].bind(controller);

      if (this.isFunction(messageHandler) && propertyKey !== 'constructor') {
        const pattern = Reflect.getMetadata(PATTERN_METADATA, controller, propertyKey);

        if (this.isMessageHandler(pattern)) {
          const handlerParamMetadata = Reflect.getMetadata(HANDLER_ARGS_METADATA, controller, propertyKey);

          controllerMetadata.messageHandlers[pattern] = {
            handler: messageHandler,
            paramsMetadata: handlerParamMetadata,
          };
        }
      }
    }

    return controllerMetadata;
  }

  private isMessageHandler(pattern: string): boolean {
    return pattern !== undefined;
  }
}
