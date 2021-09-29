import { Container } from 'inversify';
import { ProcessIpcTransportComposer } from '../../../../lib/core/container/composers/ipc/process-ipc-transport.composer';
import { ContainerComposition } from '../../../../lib/core/container/container-composition';
import { ModuleConfig } from '../../../../lib/core/types/module-config.type';

export async function getMockContainerWithDependencies(
  config?: ModuleConfig,
): Promise<Container> {
  const moduleConfig: ModuleConfig = config
    ? config
    : { mode: 'CLIENT', options: { secure: false } };
  const container = new Container({ autoBindInjectable: true });

  await new ContainerComposition(container, moduleConfig, [
    ProcessIpcTransportComposer,
  ]).composeDependencies();

  return container;
}
