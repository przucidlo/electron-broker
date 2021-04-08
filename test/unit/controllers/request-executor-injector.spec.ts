import { RequestExecutorInjector } from '../../../lib/controllers/request-executor-injector';
import { ExecutionContext } from '../../../lib/controllers/execution-context';
import { RequestExecutor } from '../../../lib/controllers/request-executor';
import MessagePattern from '../../../lib/decorators/message-pattern.decorator';
import { BrokerEventData } from '../../../lib/interfaces/broker-event-data.interface';
import { ControllerMetadata } from '../../../lib/interfaces/controller-metadata.interface';
import { ControllerHandlersMetadataReader } from '../../../lib/metadata-readers/controller-handlers-metadata.reader';
import { ControllerMetadataReader } from '../../../lib/metadata-readers/controller-metadata.reader';

describe('RequestExecutorInjector', () => {
  class TestController {
    @MessagePattern('test')
    public test(): string {
      return '';
    }
  }

  let requestInjector: RequestExecutorInjector;
  let controllersMetadata: ControllerMetadata[];
  let executionContext: ExecutionContext;
  let requestExecutor: RequestExecutor;
  let mockEventData: BrokerEventData;

  beforeEach(() => {
    mockEventData = {
      type: 'REQUEST',
      data: {},
      eventId: '0',
      pattern: 'test',
    };

    controllersMetadata = new ControllerMetadataReader(new ControllerHandlersMetadataReader()).readAll([
      new TestController(),
    ]);

    executionContext = new ExecutionContext(controllersMetadata[0].messageHandlers['test'], mockEventData);

    requestExecutor = Object.create(RequestExecutor);
    requestExecutor.executeRequest = jest.fn();

    requestInjector = new RequestExecutorInjector(
      () => executionContext,
      () => requestExecutor,
    );
  });

  describe('inject', () => {
    it('Should wrap message handlers with request executor', () => {
      requestInjector.injectIntoControllers(controllersMetadata);

      controllersMetadata[0].messageHandlers['test'].handler(mockEventData);

      expect(requestExecutor.executeRequest).toBeCalled();
    });

    it('Should make the controller accept only the requests', () => {
      requestInjector.injectIntoControllers(controllersMetadata);

      mockEventData.type = 'RESPONSE';

      controllersMetadata[0].messageHandlers['test'].handler(mockEventData);

      expect(requestExecutor.executeRequest).not.toBeCalled();
    });
  });
});
