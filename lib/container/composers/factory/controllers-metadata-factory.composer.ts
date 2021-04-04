import { Container } from 'inversify';
import { Symbols } from '../../../constants/symbols';
import { ControllerMetadata } from '../../../interfaces/controller-metadata.interface';
import { Controller } from '../../../types/controller.type';
import { AbstractMetadataReader } from '../../../metadata-readers/abstract-metadata.reader';
import { ContainerConfiguarableComposer } from '../../abstract/container-configurable-composer';

export class ControllersMetadataFactoryComposer extends ContainerConfiguarableComposer {
  private metadataReader: AbstractMetadataReader;

  constructor(container: Container) {
    super(container);

    this.metadataReader = container.get(Symbols.ControllerMetadataReader);
  }

  public compose(): void {
    this.container.bind(Symbols.ControllersMetadataFactory).toFactory(() => {
      return () => this.getControllersMetadata(this.getControllers());
    });
  }

  private getControllers(): Record<string, unknown>[] {
    return this.getControllersInstances(this.config.controllers);
  }

  private getControllersInstances(controllers: Controller[]): Record<string, unknown>[] {
    return controllers.map((controller) => {
      if (typeof controller === 'object' && controller !== null) {
        return controller;
      }

      return this.container.get<any>(controller as any);
    });
  }

  private getControllersMetadata(controllers: Record<string, unknown>[]): ControllerMetadata[] {
    return controllers.map((controller) => this.metadataReader.read(controller));
  }
}
