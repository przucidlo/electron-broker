import { Symbols } from '../../constants/symbols';
import { ControllerMetadataReader } from '../../metadata-readers/controller-metadata.reader';
import { ContainerConfiguarableComposer } from '../abstract/container-configurable-composer';

export class MetadataReadersComposer extends ContainerConfiguarableComposer {
  public compose(): void {
    this.container
      .bind(Symbols.ControllerMetadataReader)
      .to(ControllerMetadataReader)
      .inSingletonScope();
  }
}
