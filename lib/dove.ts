import { Container } from 'inversify';
import { Middleware } from '.';
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
  }

  private setContainer(config: ModuleConfig) {
    if (config.container) {
      this.container = config.container;
    } else {
      this.container = new Container({ autoBindInjectable: true });
    }
  }

  private composeDependencies(config: ModuleConfig): void {
    new ContainerComposition(this.container, config).composeDependencies();
  }

  public start(): void {
    const moduleMode: ModuleMode = this.container.get<ModuleMode>(Symbols.ModuleMode);

    moduleMode.start();
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
}
