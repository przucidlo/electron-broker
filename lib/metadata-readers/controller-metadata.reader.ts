import { injectable } from 'inversify';
import 'reflect-metadata';
import { PATTERN_METADATA } from '../constants/constants';
import { ControllerMetadata } from '../interfaces/controller-metadata.interface';
import { AbstractMetadataReader } from './abstract-metadata.reader';

@injectable()
export class ControllerMetadataReader extends AbstractMetadataReader {
  public read<T extends object, U extends keyof T>(controller: U): ControllerMetadata {
    let controllerMetadata: ControllerMetadata = {
      messageHandlers: {},
    };

    for (let propertyKey of Object.getOwnPropertyNames(Object.getPrototypeOf(controller))) {
      const property = (controller as any)[propertyKey].bind(controller);

      if (this.isFunction(property) && propertyKey !== 'constructor') {
        const pattern = Reflect.getMetadata(PATTERN_METADATA, controller, propertyKey);

        if (this.isMessageHandler(pattern)) {
          controllerMetadata.messageHandlers[pattern] = property;
        }
      }
    }

    return controllerMetadata;
  }

  private isMessageHandler(pattern: string): boolean {
    return pattern !== undefined;
  }
}
