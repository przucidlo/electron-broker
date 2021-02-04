import { injectable } from 'inversify';
import { IpcMiddleware } from '../../interfaces/ipc-middleware.interface';

@injectable()
export class PayloadMiddleware implements IpcMiddleware {
  onRequest(args: any): any[] {
    return args.data;
  }
}
