import { ControllerHandlerMetadata } from './controller-handler-metadata.interface';

type Pattern = string;

export interface ControllerMetadata {
  // eslint-disable-next-line @typescript-eslint/ban-types
  type: Function;
  messageHandlers: Record<Pattern, ControllerHandlerMetadata>;
}
