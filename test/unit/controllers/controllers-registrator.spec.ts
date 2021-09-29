import { ControllersRegistrator } from '../../../lib/core/controllers/controllers-registrator';
import { HandlerParamsMapper } from '../../../lib/core/controllers/handler-params-mapper';
import { RequestExecutor } from '../../../lib/core/controllers/request-executor';
import { RequestExecutorInjector } from '../../../lib/core/controllers/request-executor-injector';
import { ControllerMetadata } from '../../../lib/core/interfaces/controller-metadata.interface';
import { IpcTransport } from '../../../lib/core/interfaces/ipc-transport.interface';
import { getMockBrokerEventData } from '../__mocks__/get-mock-broker-event-data';
import { getMockIpcTransport } from '../__mocks__/get-mock-ipc-transport';
import {
  getMockTestControllerMetadata,
  MOCK_TEST_CONTROLLER_PATTERN,
} from '../__mocks__/mock-test-controller';
import { getMockExecutionContext } from './__mocks__/get-mock-execution-context';

describe('ControllersRegistrator', () => {
  let requestExecutorInjector: RequestExecutorInjector;
  let controllerRegistrator: ControllersRegistrator;
  let controllerMetadata: ControllerMetadata;
  let ipcTransport: IpcTransport;

  beforeEach(() => {
    const executionContext = getMockExecutionContext(
      getMockTestControllerMetadata(),
      MOCK_TEST_CONTROLLER_PATTERN,
      getMockBrokerEventData(),
    );
    const requestExecutor = new RequestExecutor(
      [],
      [],
      () => <any>{},
      <HandlerParamsMapper>{},
    );

    requestExecutorInjector = new RequestExecutorInjector(
      () => executionContext,
      () => requestExecutor,
    );
    ipcTransport = getMockIpcTransport();
    controllerMetadata = getMockTestControllerMetadata();

    controllerRegistrator = new ControllersRegistrator(
      requestExecutorInjector,
      ipcTransport,
      () => [controllerMetadata],
    );
  });

  describe('register', () => {
    it('Should inject request executor into handlers', () => {
      const executorInjectorSpy = jest.spyOn(
        requestExecutorInjector,
        'injectIntoControllersHandlers',
      );

      controllerRegistrator.register();

      expect(executorInjectorSpy).toBeCalled();
    });

    it('Should register handlers in IpcTransport', () => {
      controllerRegistrator.register();

      expect(ipcTransport.register).toBeCalledWith(
        MOCK_TEST_CONTROLLER_PATTERN,
        expect.any(Function),
      );
    });
  });
});
