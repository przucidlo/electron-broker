import { interfaces } from 'inversify';
import { Symbols } from '../../../../lib/constants/symbols';
import { RequestExecutor } from '../../../../lib/controllers/request-executor';
import { getMockContainerWithDependencies } from '../mock/get-mock-container-with-dependencies';

describe('RequestExecutorFactoryComposer', () => {
  it('Should bind auto-factory for RequestExecutor class', () => {
    const container = getMockContainerWithDependencies();

    const result: interfaces.Factory<RequestExecutor> = container.get(Symbols.RequestExecutorFactory);

    expect(result().constructor).toBe(RequestExecutor);
  });
});
