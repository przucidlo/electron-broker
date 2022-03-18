import { ContainerCompositionGetter } from '../../core/types/container-composition-getter.type';
import ProcessConfigComposer from './composers/process-config.composer';

export const processContainerComposition: ContainerCompositionGetter = async () => {
  const IpcTransportComposer = (
    await import('./composers/process-ipc-transport.composer')
  ).ProcessIpcTransportComposer;

  return [ProcessConfigComposer, IpcTransportComposer];
};
