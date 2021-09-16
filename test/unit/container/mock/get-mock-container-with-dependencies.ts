import { Container } from 'inversify';
import { ContainerComposition } from '../../../../lib/container/container-composition';
import { ModuleConfig } from '../../../../lib/types/module-config.type';

export function getMockContainerWithDependencies(config?: ModuleConfig): Container {
  const moduleConfig: ModuleConfig = config ? config : { mode: 'CLIENT' };
  const container = new Container({ autoBindInjectable: true });

  new ContainerComposition(container, moduleConfig).composeDependencies();

  return container;
}
