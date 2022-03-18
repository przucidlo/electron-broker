import { interfaces } from 'inversify';
import { Symbols } from '../../../../lib/core/constants/symbols';
import { RequestExecutor } from '../../../../lib/core/controllers/request-executor';
import { getMockContainerWithDependencies } from '../mock/get-mock-container-with-dependencies';

describe('RequestExecutorFactoryComposer', () => {
  it('Should bind auto-factory for RequestExecutor class', async () => {
    const container = await getMockContainerWithDependencies();

    const result: interfaces.Factory<RequestExecutor> = container.get(
      Symbols.RequestExecutorFactory,
    );

    expect(result().constructor).toBe(RequestExecutor);
  });
});
