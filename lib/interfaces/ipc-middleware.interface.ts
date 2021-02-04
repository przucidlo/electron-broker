import { BrokerEventData } from './broker-event-data.interface';

type MessageHandler = (...args: any[]) => any;

export interface IpcMiddleware {
  onRequest?: (arg: BrokerEventData) => any | Promise<any>;
  onResponse?: (data: any) => void;
}
