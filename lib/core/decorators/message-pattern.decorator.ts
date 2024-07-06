/* eslint-disable @typescript-eslint/ban-types */
import 'reflect-metadata';
import { HANDLER_PATTERN_METADATA } from '../constants/decorators';
import { GenericMethodDecorator } from '../types/generic-method-decorator.type';
import { Message } from '../types/message.type';

export default function MessagePattern<M extends Message>(
  pattern: M['pattern'],
): GenericMethodDecorator<
  (...props: any) => M['response'] | Promise<M['response']>
> {
  return (target, propertyKey, descriptor) => {
    Reflect.defineMetadata(HANDLER_PATTERN_METADATA, pattern, descriptor.value);
  };
}
