import { Container } from 'inversify';
import { ProcessIpcTransportComposer } from '../../../../lib/process/container/composers/process-ipc-transport.composer';
import { ContainerComposition } from '../../../../lib/core/container/container-composition';
import { ModuleConfig } from '../../../../lib/core/types/module-config.type';
import { CommonConfig } from '../../../../lib/core/interfaces/options/common-config.interface';
import { ClientConfig } from '../../../../lib/core/interfaces/options/client-config.interface';

export async function getMockContainerWithDependencies(
  config?: ModuleConfig,
): Promise<Container> {
  const moduleConfig: CommonConfig & ClientConfig = config
    ? config
    : { mode: 'CLIENT', options: { secure: false } };
  const container = new Container({ autoBindInjectable: true });

  await new ContainerComposition(container, moduleConfig, [
    ProcessIpcTransportComposer,
  ]).composeDependencies();

  return container;
}
