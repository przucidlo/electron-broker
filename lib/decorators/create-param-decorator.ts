import 'reflect-metadata';
import { HANDLER_ARGS_METADATA } from '../constants/decorators';
import { BrokerEvent } from '../interfaces/broker-event.interface';
import { HandlerParamMetadata } from '../interfaces/handler-param-metadata.interface';

export default function createParamDecorator<T>(
  method: (options: T, eventData: BrokerEvent) => any,
) {
  return (options?: T): ParameterDecorator => {
    return (target, propertyKey, index) => {
      const args: any[] =
        Reflect.getMetadata(HANDLER_ARGS_METADATA, target[propertyKey]) || [];
      const type = Reflect.getMetadata(
        'design:paramtypes',
        target,
        propertyKey,
      );

      const paramMetadata: HandlerParamMetadata<T> = {
        index: index,
        method: method,
        options: options,
        type: type[index],
      };

      args.push(paramMetadata);

      Reflect.defineMetadata(HANDLER_ARGS_METADATA, args, target[propertyKey]);
    };
  };
}
