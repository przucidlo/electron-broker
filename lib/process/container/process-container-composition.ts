import { ContainerCompositionGetter } from '../../core/types/container-composition-getter.type';
import ProcessConfigComposer from './composers/process-config.composer';

export const processContainerComposition: ContainerCompositionGetter = async () => {
  const IpcTransportComposer = (
    await import('./composers/ipc-transport-process.composer')
  ).IpcTransportProcessComposer;

  return [ProcessConfigComposer, IpcTransportComposer];
};
