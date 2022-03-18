import { ControllersRegistrator } from '../../../../lib/core/controllers/controllers-registrator';
import { RequestExecutorInjector } from '../../../../lib/core/controllers/request-executor-injector';
import { getMockIpcTransport } from '../../__mocks__/get-mock-ipc-transport';
import { getMockTestControllerMetadata } from '../../__mocks__/mock-test-controller';

export function getMockControllersRegistrator(): ControllersRegistrator {
  const requestExecutorInjector = <RequestExecutorInjector>(
    (<unknown>{ injectIntoControllersHandlers: jest.fn().mockReturnValue([]) })
  );

  return new ControllersRegistrator(
    requestExecutorInjector,
    getMockIpcTransport(),
    () => [getMockTestControllerMetadata()],
  );
}
