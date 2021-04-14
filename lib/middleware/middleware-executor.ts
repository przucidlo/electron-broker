import ExecutionContext from '../controllers/execution-context';
import Middleware from '../interfaces/middleware.interface';

export class MiddlewareExecutor {
  constructor(private middlewares: Middleware[]) {}

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
