import { injectable } from 'inversify';
import { BrokerEventData } from '../../interfaces/broker-event-data.interface';
import { Middleware } from '../../interfaces/middleware.interface';

@injectable()
export class PayloadMiddleware implements Middleware {
  onRequest(args: BrokerEventData): unknown {
    return args.data;
  }
}
