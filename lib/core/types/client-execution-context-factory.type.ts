import ExecutionContext from '../controllers/execution-context';
import { BrokerEvent } from '../interfaces/broker-event.interface';

export type ClientExecutionContextFactory = (
  brokerEvent: BrokerEvent,
) => ExecutionContext;
