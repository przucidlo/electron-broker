import { ControllersRegistrator } from '../../../lib/controllers/controllers-registrator';
import { RequestExecutorInjector } from '../../../lib/controllers/request-executor-injector';
import { ControllerMetadata } from '../../../lib/interfaces/controller-metadata.interface';
import { IpcTransport } from '../../../lib/interfaces/ipc-transport.interface';
import { getMockIpcTransport } from '../__mocks__/get-mock-ipc-transport';
import { getMockTestControllerMetadata, MOCK_TEST_CONTROLLER_PATTERN } from '../__mocks__/mock-test-controller';

describe('ControllersRegistrator', () => {
  let requestExecutorInjector: RequestExecutorInjector;
  let controllerRegistrator: ControllersRegistrator;
  let controllerMetadata: ControllerMetadata;
  let ipcTransport: IpcTransport;

  beforeEach(() => {
    requestExecutorInjector = <RequestExecutorInjector>(<unknown>{ injectIntoControllers: jest.fn() });
    ipcTransport = getMockIpcTransport();
    controllerMetadata = getMockTestControllerMetadata();

    controllerRegistrator = new ControllersRegistrator(requestExecutorInjector, ipcTransport, () => [
      controllerMetadata,
    ]);
  });

  describe('register', () => {
    it('Should inject request executor into handlers', () => {
      controllerRegistrator.register();

      expect(requestExecutorInjector.injectIntoControllers).toBeCalled();
    });

    it('Should register handlers in IpcTransport', () => {
      controllerRegistrator.register();

      expect(ipcTransport.register).toBeCalledWith(MOCK_TEST_CONTROLLER_PATTERN, expect.any(Function));
    });
  });
});
