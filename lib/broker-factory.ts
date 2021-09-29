import { Container } from 'inversify';
import { Broker } from '.';
import { AbstractContainerComposer } from './core/container/abstract/abstract-container-composer';
import { ContainerComposition } from './core/container/container-composition';
import { ClassType } from './core/types/class.type';
import { ModuleConfig } from './core/types/module-config.type';

export default class BrokerFactory {
  public static async createMainBroker(config: ModuleConfig): Promise<Broker> {
    await this.composeDependencies(config, [
      (
        await import(
          './core/container/composers/ipc/broker-ipc-transport.composer'
        )
      ).BrokerIpcTransportComposer,
    ]);

    return new Broker(config);
  }

  public static async createRendererBroker(
    config: ModuleConfig,
  ): Promise<Broker> {
    await this.composeDependencies(config, [
      (
        await import(
          './core/container/composers/ipc/renderer-ipc-transport.composer'
        )
      ).RendererIpcTransportComposer,
    ]);

    return new Broker(config);
  }

  public static async createProcessBroker(
    config: ModuleConfig,
  ): Promise<Broker> {
    await this.composeDependencies(config, [
      (
        await import(
          './core/container/composers/ipc/process-ipc-transport.composer'
        )
      ).ProcessIpcTransportComposer,
    ]);

    return new Broker(config);
  }

  private static async composeDependencies(
    config: ModuleConfig,
    extraComposers: ClassType<AbstractContainerComposer>[],
  ): Promise<void> {
    const container = this.getModuleContainer(config);

    await new ContainerComposition(
      container,
      config,
      extraComposers,
    ).composeDependencies();
  }

  private static getModuleContainer(config: ModuleConfig): Container {
    if (!config.container) {
      config.container = new Container({
        autoBindInjectable: true,
        defaultScope: 'Transient',
      });
    }

    return config.container;
  }
}
