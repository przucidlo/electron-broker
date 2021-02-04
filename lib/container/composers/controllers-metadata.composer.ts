import { Container } from 'inversify';
import { DoveMode } from '../../constants/dove-mode.enum';
import { Symbols } from '../../constants/symbols';
import { Constructor } from '../../dove';
import { ControllerMetadata } from '../../interfaces/controller-metadata.interface';
import { AbstractMetadataReader } from '../../metadata-readers/abstract-metadata.reader';
import { ContainerConfiguarableComposer } from '../abstract/container-configurable-composer';

export class ControllersMatadataComposer extends ContainerConfiguarableComposer {
  private metadataReader: AbstractMetadataReader;

  constructor(container: Container) {
    super(container);

    this.metadataReader = container.get(Symbols.ControllerMetadataReader);
  }

  public compose(): void {
    if (this.isModuleUsingControllers()) {
      const controllersMetadata: ControllerMetadata[] = this.getControllersMetadata(this.getControllers());

      this.container.bind(Symbols.ControllerMetadata).toConstantValue(controllersMetadata);
    }
  }

  private getControllers(): object[] {
    if (this.config.mode === DoveMode.PROCESS || this.config.mode === DoveMode.RENDERER) {
      return this.getControllersInstances(this.config.options.messageControllers);
    }
    throw new Error('Controllers are not available in this mode.');
  }

  private getControllersInstances(controllers: Constructor[]): object[] {
    return controllers.map((controller) => this.container.get<object>(controller));
  }

  private getControllersMetadata(controllers: object[]): ControllerMetadata[] {
    return controllers.map((controller) => this.metadataReader.read(controller as never));
  }
}
