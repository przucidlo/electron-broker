import { ExecutionContext, ParamTransformerMiddleware } from '../../../lib';
import { getMockTestControllerParamMetadata, MockTestController } from '../__mocks__/mock-test-controller';

describe('ParamTransformerMiddleware', () => {
  let middleware: ParamTransformerMiddleware;

  beforeEach(() => {
    middleware = new ParamTransformerMiddleware();
  });

  describe('onRequest', () => {
    it('Should use class-transformer to convert param plain object to class', () => {
      const paramMetadata = getMockTestControllerParamMetadata();
      const fakeExecutionContext: ExecutionContext = <ExecutionContext>{
        getParamMetadata: () => paramMetadata,
        brokerEventData: { data: {} },
      };

      middleware.onRequest(fakeExecutionContext);

      const paramMethodResult = paramMetadata[0].method({}, { data: {}, type: 'REQUEST', eventId: '123', pattern: '' });

      expect(paramMethodResult.constructor).toBe(MockTestController);
    });

    it('Should throw an error if ExecutionContext.getParamMetadata method returns undefined', () => {
      const fakeExecutionContext: ExecutionContext = <ExecutionContext>{ getParamMetadata: () => undefined };

      expect(() => middleware.onRequest(fakeExecutionContext)).toThrow();
    });
  });
});
