import { Container } from "inversify";
import { Symbols } from "./constants/symbols";
import { ContainerComposition } from "./container/container-composition";
import { IpcModuleConfig } from "./interfaces/ipc-module-config.type";
import { ModuleMode } from "./interfaces/module-mode.interface";

export type Constructor = new (...args: any[]) => {};

export default class Dove {
  private container: Container;
  private containerComposition: ContainerComposition;

  constructor(config: IpcModuleConfig) {
    this.createModuleContainer();
    this.setParentContainer(config);
    this.containerComposition = new ContainerComposition(
      this.container,
      config
    );
    this.containerComposition.composeDependencies();
  }

  private createModuleContainer() {
    this.container = new Container();
  }

  private setParentContainer(config: IpcModuleConfig) {
    if (config.parentContainer) {
      this.container = config.parentContainer;
    }
  }

  public start(): void {
    const moduleMode: ModuleMode = this.container.get<ModuleMode>(
      Symbols.ModuleMode
    );

    moduleMode.start();
  }
}
