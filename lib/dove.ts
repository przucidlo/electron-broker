import { Container } from 'inversify';
import { Middleware, TransformableDoveClient } from '.';
import DoveClient from './client/dove.client';
import { Symbols } from './constants/symbols';
import { ContainerComposition } from './container/container-composition';
import { ModuleMode } from './interfaces/module-mode.interface';
import { ClassType } from './types/class.type';
import { Controller } from './types/controller.type';
import { ModuleConfig } from './types/ipc-module-config.type';

export default class Dove {
  private container: Container;

  constructor(config: ModuleConfig) {
    this.setContainer(config);
    this.composeDependencies(config);
    this.setMaxListeners();
  }

  private setContainer(config: ModuleConfig) {
    if (config.container) {
      this.container = config.container;
    } else {
      this.container = new Container({ autoBindInjectable: true, defaultScope: 'Transient' });
    }
  }

  private composeDependencies(config: ModuleConfig): void {
    new ContainerComposition(this.container, config).composeDependencies();
  }

  private setMaxListeners() {
    process.setMaxListeners(0);
  }

  public start(): void {
    const moduleMode: ModuleMode = this.container.get<ModuleMode>(Symbols.ModuleMode);

    this.setControllersScope();

    moduleMode.start();
  }

  private setControllersScope() {
    const moduleConfig: ModuleConfig = this.container.get(Symbols.IpcModuleConfig);

    for (const controller of moduleConfig.controllers) {
      if (typeof controller !== 'object') {
        this.container
          .bind(controller as any)
          .to(controller as any)
          .inSingletonScope();
      }
    }
  }

  public setMiddleware(middleware: (ClassType<Middleware> | Middleware)[]): void {
    this.container.rebind(Symbols.GlobalMiddleware).toConstantValue(middleware);
  }

  public setControllers(controllers: Controller[]): void {
    const moduleConfig: ModuleConfig = this.container.get(Symbols.IpcModuleConfig);

    moduleConfig.controllers = [...controllers];
  }

  public getDoveClient(): DoveClient {
    return this.container.get(DoveClient);
  }

  public getTransformableDoveClient(): TransformableDoveClient {
    return this.container.get(TransformableDoveClient);
  }
}
