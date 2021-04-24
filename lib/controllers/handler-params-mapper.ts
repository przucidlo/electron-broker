import { injectable } from 'inversify';
import { BrokerEvent } from '../interfaces/broker-event.interface';
import { HandlerParamMetadata } from '../interfaces/handler-param-metadata.interface';

@injectable()
export class HandlerParamsMapper {
  public mapBrokerEventData(paramsMetadata: HandlerParamMetadata<any>[], eventData: BrokerEvent): any[] {
    const paramsValue = [].fill(undefined, 0, paramsMetadata.length);

    for (const metadata of paramsMetadata) {
      paramsValue[metadata.index] = metadata.method(metadata.options, eventData);
    }

    return paramsValue;
  }
}
