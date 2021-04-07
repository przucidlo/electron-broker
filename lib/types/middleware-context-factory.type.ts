import { BrokerEventData } from '../interfaces/broker-event-data.interface';
import { ControllerHandlerMetadata } from '../interfaces/controller-handler-metadata.interface';
import { ExecutionContext } from '../middleware/execution-context';

export type MiddlewareContextFactory = (metadata: ControllerHandlerMetadata, data: BrokerEventData) => ExecutionContext;
