import { ExecutionContext } from '../../../../lib';
import { BrokerEvent } from '../../../../lib/core/interfaces/broker-event.interface';
import { ControllerMetadata } from '../../../../lib/core/interfaces/controller-metadata.interface';

export function getMockExecutionContext(
  metadata: ControllerMetadata,
  pattern: string,
  brokerEvent: BrokerEvent,
): ExecutionContext {
  const handlerMetadata = metadata.messageHandlers[pattern];

  return new ExecutionContext(
    {
      controller: handlerMetadata.controller,
      handler: handlerMetadata.handler,
      middleware: [],
      paramsMetadata: [],
    },
    brokerEvent,
  );
}
