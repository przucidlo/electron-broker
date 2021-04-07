import { injectable } from 'inversify';
import { BrokerEventData } from '../interfaces/broker-event-data.interface';
import { ControllerHandlerMetadata } from '../interfaces/controller-handler-metadata.interface';
import { MessageHandler } from '../types/message-handler.type';

@injectable()
export class ExecutionContext {
  constructor(private metadata: ControllerHandlerMetadata, public brokerEventData: BrokerEventData) {}

  // eslint-disable-next-line @typescript-eslint/ban-types
  public getClass(): Function {
    return this.metadata.controller;
  }

  public getHandler(): MessageHandler {
    return this.metadata.handler;
  }
}
