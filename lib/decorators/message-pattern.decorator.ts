import 'reflect-metadata';
import { PATTERN_METADATA } from '../constants/constants';

export default function MessagePattern(pattern: string): MethodDecorator {
  return (target: object, propertyKey: string) => {
    Reflect.defineMetadata(PATTERN_METADATA, pattern, target, propertyKey);
  };
}