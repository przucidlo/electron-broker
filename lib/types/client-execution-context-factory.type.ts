import ExecutionContext from '../controllers/execution-context';
import { BrokerEvent } from '../interfaces/broker-event-data.interface';

export type ClientExecutionContextFactory = (brokerEvent: BrokerEvent) => ExecutionContext;
