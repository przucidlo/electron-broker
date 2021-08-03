/* eslint-disable @typescript-eslint/ban-types */
import 'reflect-metadata';
import { HANDLER_PATTERN_METADATA } from '../constants/decorators';

export default function MessagePattern(pattern: string): MethodDecorator {
  return (target, propertyKey, descriptor) => {
    Reflect.defineMetadata(HANDLER_PATTERN_METADATA, pattern, descriptor.value);
  };
}
