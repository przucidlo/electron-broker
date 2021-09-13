import { Container } from 'inversify';
import { AbstractContainerComposer } from './abstract/abstract-container-composer';
import { ControllersMetadataFactoryComposer } from './composers/factory/controllers-metadata-factory.composer';
import { BrokerClientComposer } from './composers/broker-client.composer';
import { IpcTransportComposer } from './composers/ipc-transport.composer';
import { MetadataReadersComposer } from './composers/metadata-readers.composer';
import { MiddlewareComposer } from './composers/middleware.composer';
import { ConfigComposer } from './composers/config.composer';
import { ModeComposer } from './composers/mode.composer';
import { ModuleConfig } from '../types/ipc-module-config.type';
import { ExecutionContextFactoryComposer } from './composers/factory/execution-context-factory.composer';
import { RequestExecutorFactoryComposer } from './composers/factory/request-executor-factory.composer';
import { MiddlewareFactoryComposer } from './composers/factory/middleware-factory.composer';
import { MiddlewareExecutorFactoryComposer } from './composers/factory/middleware-executor-factory.composer';
import { ClassType } from '../types/class.type';
import { BrokerResponseListenerFactoryComposer } from './composers/factory/broker-response-listener-factory.composer';

export class ContainerComposition {
  private static composersOrder: ClassType<AbstractContainerComposer>[] = [
    IpcTransportComposer,
    BrokerClientComposer,
    MetadataReadersComposer,
    MiddlewareFactoryComposer,
    MiddlewareExecutorFactoryComposer,
    ExecutionContextFactoryComposer,
    RequestExecutorFactoryComposer,
    BrokerResponseListenerFactoryComposer,
    ControllersMetadataFactoryComposer,
    MiddlewareComposer,
    ModeComposer,
  ];

  constructor(private container: Container, private config: ModuleConfig) {}

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
