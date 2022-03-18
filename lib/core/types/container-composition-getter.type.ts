import { Composer } from './composer.type';

export type ContainerCompositionGetter = () => Promise<Composer[]> | Composer[];
