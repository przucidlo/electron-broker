import Middleware from '../interfaces/middleware.interface';

export type MiddlewareFactory = (middleware: new (...args: any[]) => Middleware) => Middleware;
