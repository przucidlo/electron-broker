import { RequestExecutorInjector } from '../../../lib/controllers/request-executor-injector';
import { ExecutionContext } from '../../../lib/controllers/execution-context';
import { RequestExecutor } from '../../../lib/controllers/request-executor';
import { BrokerEventData } from '../../../lib/interfaces/broker-event-data.interface';
import { ControllerMetadata } from '../../../lib/interfaces/controller-metadata.interface';
import { getMockBrokerEventData } from '../__mocks__/get-mock-broker-event-data';
import { getMockTestControllerMetadata, MOCK_TEST_CONTROLLER_PATTERN } from '../__mocks__/mock-test-controller';
import { ControllerHandlerMetadata } from '../../../lib/interfaces/controller-handler-metadata.interface';

describe('RequestExecutorInjector', () => {
  let handlerMetadata: ControllerHandlerMetadata;
  let requestInjector: RequestExecutorInjector;
  let controllerMetadata: ControllerMetadata;
  let executionContext: ExecutionContext;
  let requestExecutor: RequestExecutor;
  let mockEventData: BrokerEventData;

  beforeEach(() => {
    controllerMetadata = getMockTestControllerMetadata();
    handlerMetadata = controllerMetadata.messageHandlers[MOCK_TEST_CONTROLLER_PATTERN];
    mockEventData = getMockBrokerEventData();

    executionContext = new ExecutionContext(
      { controller: handlerMetadata.controller, handler: handlerMetadata.handler, middleware: [], paramsMetadata: [] },
      mockEventData,
    );

    requestExecutor = Object.create(RequestExecutor);
    requestExecutor.executeRequest = jest.fn();

    requestInjector = new RequestExecutorInjector(
      () => executionContext,
      () => requestExecutor,
    );
  });

  describe('inject', () => {
    it('Should wrap message handlers with request executor', () => {
      requestInjector.injectIntoControllers([controllerMetadata]);

      handlerMetadata.handler(mockEventData);

      expect(requestExecutor.executeRequest).toBeCalled();
    });

    it('Should make the controller accept only the requests', () => {
      requestInjector.injectIntoControllers([controllerMetadata]);

      mockEventData.type = 'RESPONSE';

      handlerMetadata.handler(mockEventData);

      expect(requestExecutor.executeRequest).not.toBeCalled();
    });
  });
});
