import Middleware from '../interfaces/middleware.interface';
import { ResultBroadcastMiddleware } from '../middleware/internal/result-broadcast.middleware';
import { ClassType } from '../types/class.type';

export const INTERNAL_MIDDLEWARE_ORDER: ClassType<Middleware>[] = [
  ResultBroadcastMiddleware,
];
