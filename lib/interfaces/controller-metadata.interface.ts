import { ControllerHandlerMetadata } from './controller-handler-metadata.interface';

type Pattern = string;

export interface ControllerMetadata {
  messageHandlers: Record<Pattern, ControllerHandlerMetadata>;
}
