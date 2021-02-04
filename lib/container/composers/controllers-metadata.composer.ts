import { Container } from 'inversify';
import { DoveMode } from '../../constants/dove-mode.enum';
import { Symbols } from '../../constants/symbols';
import { Constructor } from '../../dove';
import { ControllerMetadata } from '../../interfaces/controller-metadata.interface';
import { AbstractMetadataReader } from '../../metadata-readers/abstract-metadata.reader';
import { ContainerConfiguarableComposer } from '../abstract/container-configurable-composer';

export class ControllersMatadataComposer extends ContainerConfiguarableComposer {
  constructor(container: Container) {
    super(container);
  }

  public compose(): void {
    this.container.bind(Symbols.Controllers).toConstantValue(this.config.controllers);
  }
}
