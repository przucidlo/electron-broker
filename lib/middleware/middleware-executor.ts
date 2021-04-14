import ExecutionContext from '../controllers/execution-context';
import Middleware from '../interfaces/middleware.interface';
import { ClassType } from '../types/class.type';
import { MiddlewareFactory } from '../types/middleware-factory.type';

export class MiddlewareExecutor {
  private middlewares: Middleware[];

  constructor(private middlewareFactory: MiddlewareFactory, middlewareList: (ClassType<Middleware> | Middleware)[]) {
    this.middlewares = this.createMiddlewaresObjects(middlewareList);
  }

  private createMiddlewaresObjects(middlewares: (ClassType<Middleware> | Middleware)[]): Middleware[] {
    const middlewareObjects: Middleware[] = [];

    for (const middleware of middlewares) {
      middlewareObjects.push(this.middlewareFactory(middleware));
    }

    return middlewareObjects;
  }

  public async executeOnRequest(context: ExecutionContext): Promise<void> {
    for (const middleware of this.middlewares) {
      if (middleware.onRequest) {
        await middleware.onRequest(context);
      }
    }
  }

  public async executeOnResponse(data: unknown): Promise<unknown> {
    let response = data;

    for (const middleware of this.middlewares.reverse()) {
      if (middleware.onResponse) {
        response = await middleware.onResponse(response);
      }
    }

    return response;
  }
}
