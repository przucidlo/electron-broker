type Pattern = string;

export interface ControllerMetadata {
  messageHandlers: Record<Pattern, any[string]>;
}
