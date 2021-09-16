import { Symbols } from '../../../../lib/constants/symbols';
import { MiddlewareExecutor } from '../../../../lib/middleware/middleware-executor';
import { MiddlewareExecutorFactory } from '../../../../lib/types/middleware-executor-factory.type';
import { getMockContainerWithDependencies } from '../mock/get-mock-container-with-dependencies';

describe('MiddlewareExecutorFactoryComposer', () => {
  let middlewareExecutorFactory: MiddlewareExecutorFactory;

  beforeEach(() => {
    const container = getMockContainerWithDependencies();

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
