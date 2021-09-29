import { Middleware } from '../..';
import { MiddlewareExecutor } from '../middleware/middleware-executor';
import { ClassType } from './class.type';

export type MiddlewareExecutorFactory = (
  middleware: (ClassType<Middleware> | Middleware)[],
) => MiddlewareExecutor;
