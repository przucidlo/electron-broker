import { ContainerCompositionGetter } from '../../core/types/container-composition-getter.type';
import MainConfigComposer from './composers/main-config.composer';

export const mainContainerComposition: ContainerCompositionGetter = async () => {
  const IpcTransportComposer = (
    await import('./composers/ipc-transport-main.composer')
  ).IpcTransportMainComposer;

  return [MainConfigComposer, IpcTransportComposer];
};
