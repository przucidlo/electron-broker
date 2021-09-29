import Middleware from '../interfaces/middleware.interface';
import { ClassType } from './class.type';

export type MiddlewareFactory = (
  middleware: ClassType<Middleware> | Middleware,
) => Middleware;
