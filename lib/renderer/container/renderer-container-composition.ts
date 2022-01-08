import { ContainerCompositionGetter } from '../../core/types/container-composition-getter.type';
import RendererConfigComposer from './composers/renderer-config.composer';

export const rendererContainerComposition: ContainerCompositionGetter = async () => {
  const IpcTransportComposer = (
    await import('./composers/renderer-ipc-transport.composer')
  ).RendererIpcTransportComposer;

  return [RendererConfigComposer, IpcTransportComposer];
};
