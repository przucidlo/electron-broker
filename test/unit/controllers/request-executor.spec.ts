import { ExecutionContext } from '../../../lib/controllers/execution-context';
import { HandlerParamsMapper } from '../../../lib/controllers/handler-params-mapper';
import { RequestExecutor } from '../../../lib/controllers/request-executor';
import { ControllerMetadata } from '../../../lib/interfaces/controller-metadata.interface';
import { Middleware } from '../../../lib/interfaces/middleware.interface';
import { getMockBrokerEventData } from '../__mocks__/get-mock-broker-event-data';
import { getMockTestControllerMetadata, MOCK_TEST_CONTROLLER_PATTERN } from '../__mocks__/mock-test-controller';

describe('RequestExecutor', () => {
  let controllerMetadata: ControllerMetadata;
  let requestExecutor: RequestExecutor;
  let executionContext: ExecutionContext;
  let middleware: Middleware;

  beforeEach(() => {
    controllerMetadata = getMockTestControllerMetadata();

    middleware = {
      onRequest: jest.fn(),
      onResponse: jest.fn(),
    };

    executionContext = new ExecutionContext(
      controllerMetadata.messageHandlers[MOCK_TEST_CONTROLLER_PATTERN],
      getMockBrokerEventData(),
    );

    requestExecutor = new RequestExecutor([<any>middleware], new HandlerParamsMapper(), () => middleware);
  });

  describe('executeRequest', () => {
    it('Should execute middleware onRequest method', async () => {
      await requestExecutor.executeRequest(executionContext);

      expect(middleware.onRequest).toBeCalled();
    });

    it('Should execute handler', async () => {
      const mockHandler = jest.fn();
      executionContext.getHandler = () => mockHandler;

      await requestExecutor.executeRequest(executionContext);

      expect(mockHandler).toBeCalled();
    });

    it('Should execute middleware onResponse method', async () => {
      await requestExecutor.executeRequest(executionContext);

      expect(middleware.onResponse).toBeCalled();
    });
  });
});
