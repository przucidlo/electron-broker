import { Container } from 'inversify';
import { IpcTransportProcessComposer } from '../../../../lib/process/container/composers/ipc-transport-process.composer';
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
    IpcTransportProcessComposer,
  ]).composeDependencies();

  return container;
}
