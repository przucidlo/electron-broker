import { Container } from 'inversify';
import { ProcessIpcTransportComposer } from '../../../../lib/process/container/composers/process-ipc-transport.composer';
import { ContainerComposition } from '../../../../lib/core/container/container-composition';
import { CommonConfig } from '../../../../lib/core/interfaces/options/common-config.interface';
import { ClientConfig } from '../../../../lib/core/interfaces/options/client-config.interface';
import { BrokerConfig } from '../../../../lib/core/interfaces/options/broker-config.interface';

export async function getMockContainerWithDependencies(
  config?: CommonConfig & (ClientConfig | BrokerConfig),
): Promise<Container> {
  const moduleConfig: CommonConfig & ClientConfig = config
    ? config
    : { mode: 'CLIENT', secure: false };
  const container = new Container({ autoBindInjectable: true });

  await new ContainerComposition(container, moduleConfig, [
    ProcessIpcTransportComposer,
  ]).composeDependencies();

  return container;
}
