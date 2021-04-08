import { injectable } from 'inversify';
import { BrokerEventData } from '../interfaces/broker-event-data.interface';
import { HandlerParamMetadata } from '../interfaces/handler-param-metadata.interface';

@injectable()
export class HandlerParamsMapper {
  public mapBrokerEventData(paramsMetadata: HandlerParamMetadata<any>[], eventData: BrokerEventData): any[] {
    const paramsValue = [].fill(undefined, 0, paramsMetadata.length);

    for (const metadata of paramsMetadata) {
      paramsValue[metadata.index] = metadata.method(metadata.options, eventData);
    }

    return paramsValue;
  }
}
