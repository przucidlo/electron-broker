import { ContainerCompositionGetter } from '../../core/types/container-composition-getter.type';
import MainConfigComposer from './composers/main-config.composer';

export const mainContainerComposition: ContainerCompositionGetter = async () => {
  const IpcTransportComposer = (
    await import('./composers/main-ipc-transport.composer')
  ).MainIpcTransportComposer;

  return [MainConfigComposer, IpcTransportComposer];
};
