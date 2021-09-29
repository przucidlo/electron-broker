import { BROKER_EXCEPTION_MARKER } from '../../../lib/core/constants/exceptions';
import { ExecutionContext } from '../../../lib/core/controllers/execution-context';
import { HandlerParamsMapper } from '../../../lib/core/controllers/handler-params-mapper';
import { RequestExecutor } from '../../../lib/core/controllers/request-executor';
import { ControllerHandlerMetadata } from '../../../lib/core/interfaces/controller-handler-metadata.interface';
import Middleware from '../../../lib/core/interfaces/middleware.interface';
import { MiddlewareExecutor } from '../../../lib/core/middleware/middleware-executor';
import { getMockBrokerEventData } from '../__mocks__/get-mock-broker-event-data';
import {
  getMockTestControllerMetadata,
  MOCK_TEST_CONTROLLER_PATTERN,
} from '../__mocks__/mock-test-controller';

describe('RequestExecutor', () => {
  let handlerMetadata: ControllerHandlerMetadata;
  let requestExecutor: RequestExecutor;
  let executionContext: ExecutionContext;
  let middleware: Middleware;
  let onResponse: jest.Mock;

  beforeEach(() => {
    const controllerMetadata = getMockTestControllerMetadata();

    handlerMetadata =
      controllerMetadata.messageHandlers[MOCK_TEST_CONTROLLER_PATTERN];

    onResponse = jest.fn();

    middleware = {
      onRequest: jest.fn(),
      onResponse: onResponse,
    };

    executionContext = new ExecutionContext(
      handlerMetadata,
      getMockBrokerEventData(),
    );

    requestExecutor = new RequestExecutor(
      [<any>middleware],
      [<any>middleware],
      () => new MiddlewareExecutor(() => middleware, [middleware]),
      new HandlerParamsMapper(),
    );
  });

  describe('executeRequest', () => {
    it('Should execute middleware onRequest method', async () => {
      await requestExecutor.executeRequest(executionContext, handlerMetadata);

      expect(middleware.onRequest).toBeCalled();
    });

    it('Should execute handler', async () => {
      const mockHandler = jest.fn();
      handlerMetadata.handler.apply = mockHandler;

      await requestExecutor.executeRequest(executionContext, handlerMetadata);

      expect(mockHandler).toBeCalled();
    });

    it('Should execute middleware onResponse method', async () => {
      await requestExecutor.executeRequest(executionContext, handlerMetadata);

      expect(middleware.onResponse).toBeCalled();
    });

    it('Should return serialized exception if one is thrown', async () => {
      handlerMetadata.handler = () => {
        throw new Error();
      };

      await requestExecutor.executeRequest(executionContext, handlerMetadata);

      expect(onResponse).toBeCalledWith(
        expect.objectContaining({ [BROKER_EXCEPTION_MARKER]: true }),
      );
    });
  });
});
