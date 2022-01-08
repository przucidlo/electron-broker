import { Container } from 'inversify';
import { Broker } from '.';
import { ContainerComposition } from './core/container/container-composition';
import { BrokerConfig } from './core/interfaces/options/broker-config.interface';
import { ClientConfig } from './core/interfaces/options/client-config.interface';
import { ContainerCompositionGetter } from './core/types/container-composition-getter.type';
import { ModuleConfig } from './core/types/module-config.type';
import { mainContainerComposition } from './main/container/main-container-composition';
import { processContainerComposition } from './process/container/process-container-composition';
import { rendererContainerComposition } from './renderer/container/renderer-container-composition';

export default class BrokerFactory {
  public static async createMainBroker(config: BrokerConfig): Promise<Broker> {
    await this.composeDependencies(config, mainContainerComposition);

    return new (await import('./main/broker-main')).default(config);
  }

  public static async createRendererBroker(
    config: ClientConfig,
  ): Promise<Broker> {
    await this.composeDependencies(config, rendererContainerComposition);

    return new (await import('./renderer/broker-renderer')).default(config);
  }

  public static async createProcessBroker(
    config: ClientConfig,
  ): Promise<Broker> {
    await this.composeDependencies(config, processContainerComposition);

    return new (await import('./process/broker-process')).default(config);
  }

  private static async composeDependencies(
    config: ModuleConfig,
    getComposition: ContainerCompositionGetter,
  ): Promise<void> {
    const container = this.getModuleContainer(config);

    await new ContainerComposition(
      container,
      config,
      await getComposition(),
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
