import 'reflect-metadata';
import { injectable } from 'inversify';
import { ControllerMetadata } from '../interfaces/controller-metadata.interface';
import { AbstractMetadataReader } from './abstract-metadata.reader';
import { ControllerHandlersMetadataReader } from './controller-handlers-metadata.reader';

@injectable()
export class ControllerMetadataReader extends AbstractMetadataReader {
  constructor(private handlersMetadataReader: ControllerHandlersMetadataReader) {
    super();
  }

  public read<T extends Record<any, unknown>, U extends keyof T>(controller: U): ControllerMetadata {
    const controllerMetadata: ControllerMetadata = {
      type: controller.constructor,
      messageHandlers: {},
    };

    controllerMetadata.messageHandlers = this.handlersMetadataReader.read(controller);

    return controllerMetadata;
  }
}
