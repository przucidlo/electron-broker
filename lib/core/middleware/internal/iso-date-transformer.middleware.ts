import ExecutionContext from '../../controllers/execution-context';
import { IsoDateTransformer } from '../../helpers/iso-date-transformer';
import { BrokerEvent } from '../../interfaces/broker-event.interface';
import Middleware from '../../interfaces/middleware.interface';
import { isBrokerEvent } from '../../type-guards/is-broker-event.typeguard';

/**
 * Built-in middleware that transforms ISO strings to Date object
 * in outcoming and incoming messages.
 *
 * (Works both in broker and client modes)
 */
export default class IsoDateTransformerMiddleware implements Middleware {
  public onRequest(context: ExecutionContext): void {
    context.brokerEvent.data = IsoDateTransformer.transform(
      context.brokerEvent.data,
    );
  }

  public onResponse(message: unknown): unknown {
    if (isBrokerEvent(message)) {
      return <BrokerEvent>{
        ...message,
        data: IsoDateTransformer.transform(message.data),
      };
    }
    return IsoDateTransformer.transform(message);
  }
}
