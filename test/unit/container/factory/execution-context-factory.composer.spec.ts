import { ExecutionContext } from '../../../../lib';
import { Symbols } from '../../../../lib/constants/symbols';
import { ClientExecutionContextFactory } from '../../../../lib/types/client-execution-context-factory.type';
import { ExecutionContextFactory } from '../../../../lib/types/execution-context-factory.type';
import { getMockBrokerEventData } from '../../__mocks__/get-mock-broker-event-data';
import {
  getMockTestControllerHandlerMetadata,
  getMockTestControllerMetadata,
} from '../../__mocks__/mock-test-controller';
import { getMockContainerWithDependencies } from '../mock/get-mock-container-with-dependencies';

describe('ExecutionContextFactoryComposer', () => {
  let clientExecutionContextFactory: ClientExecutionContextFactory;
  let executionContextFactory: ExecutionContextFactory;

  beforeAll(() => {
    const container = getMockContainerWithDependencies();

    clientExecutionContextFactory = container.get(
      Symbols.ClientExecutionContextFactory,
    );
    executionContextFactory = container.get(Symbols.ExecutionContextFactory);
  });

  describe('ExecutionContextFactory', () => {
    const handlerMetadata = getMockTestControllerHandlerMetadata();

    it('Should return an instanceof ExecutionContext', () => {
      const result = executionContextFactory(
        handlerMetadata,
        getMockBrokerEventData(),
      );

      expect(result instanceof ExecutionContext).toBe(true);
    });

    it('Should return new instanceof ExecutionContext each time', () => {
      const instanceA = executionContextFactory(
        handlerMetadata,
        getMockBrokerEventData(),
      );
      const instanceB = executionContextFactory(
        handlerMetadata,
        getMockBrokerEventData(),
      );

      expect(instanceA).not.toBe(instanceB);
    });
  });

  describe('ClientExecutionContextFactory', () => {
    it('Should return an instanceof ClientExecutionContext', () => {
      const result = clientExecutionContextFactory(getMockBrokerEventData());

      expect(result instanceof ExecutionContext).toBe(true);
    });

    it('Should return new instanceof ClientExecutionContext each time', () => {
      const instanceA = clientExecutionContextFactory(getMockBrokerEventData());
      const instanceB = clientExecutionContextFactory(getMockBrokerEventData());

      expect(instanceA).not.toBe(instanceB);
    });
  });
});
