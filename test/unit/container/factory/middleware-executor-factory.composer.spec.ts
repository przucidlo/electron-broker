import { Symbols } from '../../../../lib/core/constants/symbols';
import { MiddlewareExecutor } from '../../../../lib/core/middleware/middleware-executor';
import { MiddlewareExecutorFactory } from '../../../../lib/core/types/middleware-executor-factory.type';
import { getMockContainerWithDependencies } from '../mock/get-mock-container-with-dependencies';

describe('MiddlewareExecutorFactoryComposer', () => {
  let middlewareExecutorFactory: MiddlewareExecutorFactory;

  beforeEach(async () => {
    const container = await getMockContainerWithDependencies();

    middlewareExecutorFactory = container.get(
      Symbols.MiddlewareExecutorFactory,
    );
  });

  describe('MiddlewareExecutorFactory', () => {
    it('Should return a new instance of MiddlewareExecutor class', () => {
      expect(middlewareExecutorFactory([]) instanceof MiddlewareExecutor).toBe(
        true,
      );
    });
  });
});
