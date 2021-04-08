import { BrokerEventData } from '../interfaces/broker-event-data.interface';
import { ControllerHandlerMetadata } from '../interfaces/controller-handler-metadata.interface';
import { ExecutionContext } from '../controllers/execution-context';

export type ExecutionContextFactory = (metadata: ControllerHandlerMetadata, data: BrokerEventData) => ExecutionContext;
