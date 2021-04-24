import { Container } from 'inversify';
import { DoveMode } from '../../../../lib';
import { ContainerComposition } from '../../../../lib/container/container-composition';
import { ModuleConfig } from '../../../../lib/types/ipc-module-config.type';

export function getMockContainerWithDependencies(config?: ModuleConfig): Container {
  const moduleConfig: ModuleConfig = config ? config : { mode: DoveMode.PROCESS, options: {} };
  const container = new Container({ autoBindInjectable: true });

  new ContainerComposition(container, moduleConfig).composeDependencies();

  return container;
}
