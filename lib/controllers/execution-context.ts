/* eslint-disable @typescript-eslint/ban-types */
import { injectable } from 'inversify';
import { BrokerEventData } from '../interfaces/broker-event-data.interface';
import { MessageHandler } from '../types/message-handler.type';

@injectable()
export class ExecutionContext {
  constructor(private controller: Function, private handler: MessageHandler, public brokerEventData: BrokerEventData) {}

  public getClass(): Function {
    return this.controller;
  }

  public getHandler(): MessageHandler {
    return this.handler;
  }
}

export default ExecutionContext;
