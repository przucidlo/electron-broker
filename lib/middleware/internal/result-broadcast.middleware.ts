import { inject, injectable } from 'inversify';
import { BROKER_EVENT } from '../../constants/channels';
import { Symbols } from '../../constants/symbols';
import { BrokerEventData } from '../../interfaces/broker-event-data.interface';
import { Middleware } from '../../interfaces/middleware.interface';
import { IpcTransport } from '../../interfaces/ipc-transport.interface';

@injectable()
export class ResultBroadcastMiddleware implements Middleware {
  private brokerEventData: BrokerEventData;

  constructor(@inject(Symbols.IpcTransport) private icpTransport: IpcTransport) {}

  public onRequest(args: BrokerEventData): any {
    this.brokerEventData = args;

    return args;
  }

  public onResponse(data: any): void {
    this.combineEventData(data);
    this.broadcastResponse();
  }

  private combineEventData(data: any): void {
    this.brokerEventData.data = data;
    this.brokerEventData.type = 'RESPONSE';
  }

  private broadcastResponse(): void {
    this.icpTransport.send(BROKER_EVENT, this.brokerEventData);
  }
}
