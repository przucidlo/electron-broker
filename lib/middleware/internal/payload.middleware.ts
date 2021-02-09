import { injectable } from 'inversify';
import { Middleware } from '../../interfaces/middleware.interface';

@injectable()
export class PayloadMiddleware implements Middleware {
  onRequest(args: any): any[] {
    return args.data;
  }
}
