import { RequestExecutorInjector } from '../../../lib/controllers/request-executor-injector';
import { ExecutionContext } from '../../../lib/controllers/execution-context';
import { RequestExecutor } from '../../../lib/controllers/request-executor';
import { BrokerEvent } from '../../../lib/interfaces/broker-event.interface';
import { ControllerMetadata } from '../../../lib/interfaces/controller-metadata.interface';
import { getMockBrokerEventData } from '../__mocks__/get-mock-broker-event-data';
import { getMockTestControllerMetadata, MOCK_TEST_CONTROLLER_PATTERN } from '../__mocks__/mock-test-controller';
import { ControllerHandlerMetadata } from '../../../lib/interfaces/controller-handler-metadata.interface';
import { getMockExecutionContext } from './__mocks__/get-mock-execution-context';

describe('RequestExecutorInjector', () => {
  let handlerMetadata: ControllerHandlerMetadata;
  let requestInjector: RequestExecutorInjector;
  let controllerMetadata: ControllerMetadata;
  let executionContext: ExecutionContext;
  let requestExecutor: RequestExecutor;
  let mockEventData: BrokerEvent;

  beforeEach(() => {
    controllerMetadata = getMockTestControllerMetadata();
    handlerMetadata = controllerMetadata.messageHandlers[MOCK_TEST_CONTROLLER_PATTERN];
    mockEventData = getMockBrokerEventData();

    executionContext = getMockExecutionContext(controllerMetadata, MOCK_TEST_CONTROLLER_PATTERN, mockEventData);

    requestExecutor = Object.create(RequestExecutor);
    requestExecutor.executeRequest = jest.fn();

    requestInjector = new RequestExecutorInjector(
      () => executionContext,
      () => requestExecutor,
    );
  });

  describe('inject', () => {
    it('Should wrap message handlers with request executor', () => {
      const messageHandlers = requestInjector.injectIntoControllersHandlers([controllerMetadata]);

      messageHandlers[0].handler(mockEventData);

      expect(requestExecutor.executeRequest).toBeCalled();
    });

    it('Should make the controller accept only the requests', () => {
      const messageHandlers = requestInjector.injectIntoControllersHandlers([controllerMetadata]);

      mockEventData.type = 'RESPONSE';

      messageHandlers[0].handler(mockEventData);

      expect(requestExecutor.executeRequest).not.toBeCalled();
    });
  });
});
