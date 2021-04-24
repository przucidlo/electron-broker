import { BrokerEvent } from '../interfaces/broker-event.interface';
import { ControllerHandlerMetadata } from '../interfaces/controller-handler-metadata.interface';
import { ExecutionContext } from '../controllers/execution-context';

export type ExecutionContextFactory = (metadata: ControllerHandlerMetadata, data: BrokerEvent) => ExecutionContext;
