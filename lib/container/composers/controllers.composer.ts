import { Container } from 'inversify';
import { Symbols } from '../../constants/symbols';
import { ContainerConfiguarableComposer } from '../abstract/container-configurable-composer';

export class ControllersComposer extends ContainerConfiguarableComposer {
  constructor(container: Container) {
    super(container);
  }

  public compose(): void {
    this.container.bind(Symbols.Controllers).toConstantValue(this.config.controllers);
  }
}
