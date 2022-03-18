import { inject, injectable } from 'inversify';
import { BROKER_EVENT } from '../../constants/channels';
import { Symbols } from '../../constants/symbols';
import { BrokerEvent } from '../../interfaces/broker-event.interface';
import Middleware from '../../interfaces/middleware.interface';
import { IpcTransport } from '../../interfaces/ipc-transport.interface';
import { ExecutionContext } from '../../controllers/execution-context';
import { BrokerEventFactory } from '../../helpers/broker-event.factory';

@injectable()
export class ResultBroadcastMiddleware implements Middleware {
  private brokerEvent: BrokerEvent;

  constructor(
    @inject(Symbols.IpcTransport) private icpTransport: IpcTransport,
  ) {}

  public onRequest(context: ExecutionContext): any {
    this.brokerEvent = context.brokerEvent;
  }

  public onResponse(data: unknown): void {
    this.brokerEvent = BrokerEventFactory.createBrokerEventAsResponse(
      this.brokerEvent,
      data,
    );

    this.broadcastResponse();
  }

  private broadcastResponse(): void {
    this.icpTransport.send(BROKER_EVENT, this.brokerEvent);
  }
}
