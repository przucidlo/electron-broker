import 'reflect-metadata';
import { HANDLER_ARGS_METADATA } from '../constants/decorators';
import { BrokerEvent } from '../interfaces/broker-event.interface';
import { HandlerParamMetadata } from '../interfaces/handler-param-metadata.interface';

export default function createParamDecorator<
  O extends unknown,
  E extends BrokerEvent<unknown>
>(method: (options: O, eventData: E) => any) {
  return (options?: O): ParameterDecorator => {
    return (target, propertyKey, index) => {
      const args: any[] =
        Reflect.getMetadata(HANDLER_ARGS_METADATA, target[propertyKey]) || [];
      const type = Reflect.getMetadata(
        'design:paramtypes',
        target,
        propertyKey,
      );

      const paramMetadata: HandlerParamMetadata<O> = {
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
