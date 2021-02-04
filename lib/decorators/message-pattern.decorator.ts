import 'reflect-metadata';
import { PATTERN_METADATA } from '../constants/Constants';

export default function MessagePattern(pattern: string): MethodDecorator {
  return (target: object, propertyKey: string) => {
    Reflect.defineMetadata(PATTERN_METADATA, pattern, target, propertyKey);
  };
}
