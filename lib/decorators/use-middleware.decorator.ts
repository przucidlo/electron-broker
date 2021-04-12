import { MIDDLEWARE_METADATA } from '../constants/decorators';
import { Middleware } from '../interfaces/middleware.interface';
import { ClassType } from '../types/class.type';

export default function UseMiddleware(...middleware: ClassType<Middleware>[]): MethodDecorator & ClassDecorator {
  return (target: any, key?: string, descriptor?: TypedPropertyDescriptor<any>) => {
    const middlewareArray = middleware ? middleware : [];

    if (descriptor) {
      Reflect.defineMetadata(MIDDLEWARE_METADATA, middlewareArray, target, key);

      return;
    }

    Reflect.defineMetadata(MIDDLEWARE_METADATA, middlewareArray, target.prototype);

    return target;
  };
}
