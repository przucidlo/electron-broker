/* eslint-disable @typescript-eslint/no-empty-function */
import { MIDDLEWARE_METADATA } from '../../../lib/constants/decorators';
import { Middleware } from '../../../lib/decorators/middleware.decorator';
import { MockMiddleware } from '../__mocks__/mock-middleware';

describe('Middleware decorator', () => {
  @Middleware(MockMiddleware)
  class Test {
    @Middleware(MockMiddleware)
    public testMethod() {}
  }

  it('Should define metadata for controller', () => {
    const metadata = Reflect.getMetadata(MIDDLEWARE_METADATA, new Test());

    expect(metadata).toEqual([MockMiddleware]);
  });

  it('Should define metadata for method', () => {
    const metadata = Reflect.getMetadata(MIDDLEWARE_METADATA, new Test(), 'testMethod');

    expect(metadata).toEqual([MockMiddleware]);
  });
});
