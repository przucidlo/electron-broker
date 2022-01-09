import { Container } from 'inversify';
import { Middleware, TransformableBrokerClient } from '.';
import BrokerClient from './core/client/broker.client';
import { Symbols } from './core/constants/symbols';
import { ModuleMode } from './core/interfaces/module-mode.interface';
import { ClassType } from './core/types/class.type';
import { Controller } from './core/types/controller.type';
import { ModuleConfig } from './core/types/module-config.type';

export default class Broker {
  private container: Container;
  private config: ModuleConfig;

  constructor(config: ModuleConfig) {
    this.config = config;
    this.container = config.container;
  }

  public async start(): Promise<void> {
    const moduleMode: ModuleMode = this.container.get<ModuleMode>(
      Symbols.ModuleMode,
    );

    this.setControllersScope();

    moduleMode.start();
  }

  private setControllersScope() {
    const moduleConfig: ModuleConfig = this.container.get(
      Symbols.IpcModuleConfig,
    );

    for (const controller of moduleConfig.controllers) {
      if (typeof controller !== 'object') {
        this.container
          .bind(controller as any)
          .to(controller as any)
          .inSingletonScope();
      }
    }
  }

  public setMiddleware(
    middleware: (ClassType<Middleware> | Middleware)[],
  ): void {
    this.container.rebind(Symbols.GlobalMiddleware).toConstantValue(middleware);
  }

  public setControllers(controllers: Controller[]): void {
    const moduleConfig: ModuleConfig = this.container.get(
      Symbols.IpcModuleConfig,
    );

    moduleConfig.controllers = [...controllers];
  }

  public getClient(): BrokerClient {
    return this.container.get(BrokerClient);
  }

  public getTransformableClient(): TransformableBrokerClient {
    return this.container.get(TransformableBrokerClient);
  }
}
