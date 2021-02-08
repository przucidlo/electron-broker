import { Container } from 'inversify';
import { AbstractContainerComposer } from './abstract/abstract-container-composer';
import { ControllersMetadataFactoryComposer } from './composers/factory/controllers-metadata-factory.composer';
import { DoveClientComposer } from './composers/dove-client.composer';
import { IpcTransportComposer } from './composers/ipc-transport.composer';
import { MetadataReadersComposer } from './composers/metadata-readers.composer';
import { MiddlewareComposer } from './composers/middleware.composer';
import { ConfigComposer } from './composers/config.composer';
import { ModeComposer } from './composers/mode.composer';
import { IpcModuleConfig } from '../types/ipc-module-config.type';

type Composers = { new (container: Container): AbstractContainerComposer }[];

export class ContainerComposition {
  private static composersOrder: Composers = [
    IpcTransportComposer,
    DoveClientComposer,
    MetadataReadersComposer,
    ControllersMetadataFactoryComposer,
    MiddlewareComposer,
    ModeComposer,
  ];

  constructor(private container: Container, private config: IpcModuleConfig) {}

  public composeDependencies(): void {
    this.composeConfigDependency();
    this.composeDependenciesInOrder();
  }

  private composeConfigDependency(): void {
    new ConfigComposer(this.container, this.config).compose();
  }

  private composeDependenciesInOrder(): void {
    for (const ComposerClass of ContainerComposition.composersOrder) {
      const composerInstance: AbstractContainerComposer = new ComposerClass(this.container);

      composerInstance.compose();
    }
  }
}
