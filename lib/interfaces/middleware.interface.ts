import { BrokerEventData } from './broker-event-data.interface';

export interface Middleware {
  onRequest?: (arg: BrokerEventData) => any | Promise<any>;
  onResponse?: (data: any) => void;
}
