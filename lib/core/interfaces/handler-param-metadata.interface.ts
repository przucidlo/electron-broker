import { BrokerEvent } from './broker-event.interface';

export interface HandlerParamMetadata<T extends unknown> {
  index: number;
  options?: T;
  type: () => unknown;
  method: (options: T, eventData: BrokerEvent) => any;
}

// eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
export function isHandlerParamMetadata(
  arg: any,
): arg is HandlerParamMetadata<any> {
  return (
    typeof arg.index === 'number' &&
    typeof arg.type === 'function' &&
    typeof arg.method === 'function'
  );
}
