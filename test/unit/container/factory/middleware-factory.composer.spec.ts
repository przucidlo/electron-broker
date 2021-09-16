import { Container } from 'inversify';
import { Symbols } from '../../../../lib/constants/symbols';
import { MiddlewareFactory } from '../../../../lib/types/middleware-factory.type';
import { MockMiddleware } from '../../__mocks__/mock-middleware';
import { getMockContainerWithDependencies } from '../mock/get-mock-container-with-dependencies';

describe('MiddlewareFactoryComposer', () => {
  let container: Container;
  let middlewareFactory: MiddlewareFactory;

  beforeEach(() => {
    container = getMockContainerWithDependencies();

    middlewareFactory = container.get(Symbols.MiddlewareFactory);
  });

  describe('MiddlewareFactory should: ', () => {
    it('Should return object deepClone if middleware a type of object', () => {
      const testMiddleware = new MockMiddleware();

      expect(middlewareFactory(testMiddleware)).not.toBe(testMiddleware);
    });

    it('If middleware is injectable, should fetch it from container', () => {
      container.bind(MockMiddleware).to(MockMiddleware);
      const spy = jest.spyOn(container, 'get');

      middlewareFactory(MockMiddleware);

      expect(spy).toBeCalled();
    });

    it('Middleware object created by DI library, should always be a new instance', () => {
      container.bind(MockMiddleware).to(MockMiddleware);

      const instanceA = middlewareFactory(MockMiddleware);
      const instanceB = middlewareFactory(MockMiddleware);

      expect(instanceA).not.toBe(instanceB);
    });

    it('If middleware is not injectable and its not an instance of its class, factory should fallback to Object.create', () => {
      expect(middlewareFactory(MockMiddleware) instanceof MockMiddleware).toBe(
        true,
      );
    });
  });
});
