import { Middleware } from '..';
import { MiddlewareExecutor } from '../middleware/middleware-executor';

export type MiddlewareExecutorFactory = (middleware: Middleware[]) => MiddlewareExecutor;
