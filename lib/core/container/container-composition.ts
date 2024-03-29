import { Container } from 'inversify';
import { AbstractContainerComposer } from './abstract/abstract-container-composer';
import { ControllersMetadataFactoryComposer } from './composers/factory/controllers-metadata-factory.composer';
import { BrokerClientComposer } from './composers/broker-client.composer';
import { MetadataReadersComposer } from './composers/metadata-readers.composer';
import { MiddlewareComposer } from './composers/middleware.composer';
import { ConfigComposer } from './composers/config.composer';
import { ModeComposer } from './composers/mode.composer';
import { ModuleConfig } from '../types/module-config.type';
import { ExecutionContextFactoryComposer } from './composers/factory/execution-context-factory.composer';
import { RequestExecutorFactoryComposer } from './composers/factory/request-executor-factory.composer';
import { MiddlewareFactoryComposer } from './composers/factory/middleware-factory.composer';
import { MiddlewareExecutorFactoryComposer } from './composers/factory/middleware-executor-factory.composer';
import { ClassType } from '../types/class.type';
import { ResponseListenerFactoryComposer } from './composers/factory/response-listener-factory.composer';
import { IpcListenerFactoryComposer } from './composers/factory/ipc-listener-factory.composer';
import { BrokerEventSubscriberFactoryComposer } from './composers/factory/broker-event-subscriber-factory.composer';
import { Composer } from '../types/composer.type';

export class ContainerComposition {
  private static composersOrder: Composer[] = [
    IpcListenerFactoryComposer,
    BrokerClientComposer,
    MetadataReadersComposer,
    MiddlewareFactoryComposer,
    MiddlewareExecutorFactoryComposer,
    ExecutionContextFactoryComposer,
    RequestExecutorFactoryComposer,
    BrokerEventSubscriberFactoryComposer,
    ResponseListenerFactoryComposer,
    ControllersMetadataFactoryComposer,
    MiddlewareComposer,
    ModeComposer,
  ];

  constructor(
    private container: Container,
    private config: ModuleConfig,
    private extraComposers: ClassType<AbstractContainerComposer>[],
  ) {}

  public async composeDependencies(): Promise<void> {
    this.composeConfigDependency();
    await this.composeDependenciesInOrder();
  }

  private composeConfigDependency(): void {
    new ConfigComposer(this.container, this.config).compose();
  }

  private async composeDependenciesInOrder(): Promise<void> {
    for (const ComposerClass of [
      ...this.extraComposers,
      ...ContainerComposition.composersOrder,
    ]) {
      const composerInstance: AbstractContainerComposer = new ComposerClass(
        this.container,
      );

      await composerInstance.compose();
    }
  }
}
