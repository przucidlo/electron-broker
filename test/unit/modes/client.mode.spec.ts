import { ControllersRegistrator } from '../../../lib/controllers/controllers-registrator';
import { RequestExecutorInjector } from '../../../lib/controllers/request-executor-injector';
import { ControllerMetadata } from '../../../lib/interfaces/controller-metadata.interface';
import { IpcTransport } from '../../../lib/interfaces/ipc-transport.interface';
import { ClientMode } from '../../../lib/modes/client.mode';
import { getMockIpcTransport } from '../__mocks__/get-mock-ipc-transport';
import { getMockTestControllerMetadata } from '../__mocks__/mock-test-controller';

describe('ClientMode', () => {
  let requestExecutorInjector: RequestExecutorInjector;
  let controllerRegistrator: ControllersRegistrator;
  let controllerMetadata: ControllerMetadata;
  let ipcTransport: IpcTransport;

  let clientMode: ClientMode;

  beforeEach(() => {
    requestExecutorInjector = <RequestExecutorInjector>(<unknown>{ injectIntoControllers: jest.fn() });
    ipcTransport = getMockIpcTransport();
    controllerMetadata = getMockTestControllerMetadata();

    controllerRegistrator = new ControllersRegistrator(requestExecutorInjector, ipcTransport, () => [
      controllerMetadata,
    ]);

    clientMode = new ClientMode(controllerRegistrator);
  });

  describe('start', () => {
    it('Should use ControllersRegistartor object to register controllers', () => {
      const spy = jest.spyOn(controllerRegistrator, 'register');

      clientMode.start();

      expect(spy).toBeCalled();
    });
  });
});
