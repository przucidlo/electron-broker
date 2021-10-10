import { Container } from 'inversify';
import { Broker } from '.';
import { AbstractContainerComposer } from './core/container/abstract/abstract-container-composer';
import { ContainerComposition } from './core/container/container-composition';
import { ClassType } from './core/types/class.type';
import { ModuleConfig } from './core/types/module-config.type';

export default class BrokerFactory {
  public static async createMainBroker(config: ModuleConfig): Promise<Broker> {
    await this.composeDependencies(config, [
      (await import('./main/container/composers/ipc-transport-main.composer'))
        .IpcTransportMainComposer,
    ]);

    return new (await import('./main/broker-main')).default(config);
  }

  public static async createRendererBroker(
    config: ModuleConfig,
  ): Promise<Broker> {
    await this.composeDependencies(config, [
      (
        await import(
          './renderer/container/composers/renderer-ipc-transport.composer'
        )
      ).RendererIpcTransportComposer,
    ]);

    return new (await import('./renderer/broker-renderer')).default(config);
  }

  public static async createProcessBroker(
    config: ModuleConfig,
  ): Promise<Broker> {
    await this.composeDependencies(config, [
      (
        await import(
          './process/container/composers/ipc-transport-process.composer'
        )
      ).IpcTransportProcessComposer,
    ]);

    return new (await import('./process/broker-process')).default(config);
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
