import { BrokerEventData } from './broker-event-data.interface';

export interface HandlerParamMetadata<T extends unknown> {
  index: number;
  options?: T;
  type: () => unknown;
  method: (options: T, eventData: BrokerEventData) => any;
}

// eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
export function isHandlerParamMetadata(arg: any): arg is HandlerParamMetadata<any> {
  return typeof arg.index === 'number' && typeof arg.type === 'function' && typeof arg.method === 'function';
}
