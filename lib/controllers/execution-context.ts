/* eslint-disable @typescript-eslint/ban-types */
import { injectable } from 'inversify';
import { BrokerEvent } from '../interfaces/broker-event.interface';
import { ControllerHandlerMetadata } from '../interfaces/controller-handler-metadata.interface';
import { HandlerParamMetadata } from '../interfaces/handler-param-metadata.interface';
import { MessageHandler } from '../types/message-handler.type';

@injectable()
export class ExecutionContext {
  constructor(
    private metadata: ControllerHandlerMetadata,
    public brokerEvent: BrokerEvent,
  ) {}

  public getClass(): Function {
    return this.metadata.controller.constructor;
  }

  public getHandler(): MessageHandler {
    return this.metadata.handler;
  }

  public getParamMetadata(): HandlerParamMetadata<any>[] {
    return this.metadata.paramsMetadata;
  }
}

export default ExecutionContext;
