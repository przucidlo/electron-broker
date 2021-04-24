import { ControllersRegistrator } from '../../../../lib/controllers/controllers-registrator';
import { RequestExecutorInjector } from '../../../../lib/controllers/request-executor-injector';
import { getMockIpcTransport } from '../../__mocks__/get-mock-ipc-transport';
import { getMockTestControllerMetadata } from '../../__mocks__/mock-test-controller';

export function getMockControllersRegistrator(): ControllersRegistrator {
  const requestExecutorInjector = <RequestExecutorInjector>(<unknown>{ injectIntoControllers: jest.fn() });

  return new ControllersRegistrator(requestExecutorInjector, getMockIpcTransport(), () => [
    getMockTestControllerMetadata(),
  ]);
}
