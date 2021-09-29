/* eslint-disable @typescript-eslint/no-empty-function */
import { MIDDLEWARE_METADATA } from '../../../lib/core/constants/decorators';
import UseMiddleware from '../../../lib/core/decorators/use-middleware.decorator';
import { MockMiddleware } from '../__mocks__/mock-middleware';

describe('UseMiddleware', () => {
  @UseMiddleware(MockMiddleware)
  class Test {
    @UseMiddleware(MockMiddleware)
    public testMethod() {}
  }

  it('Should define metadata for controller', () => {
    const metadata = Reflect.getMetadata(MIDDLEWARE_METADATA, Test.prototype);

    expect(metadata).toEqual([MockMiddleware]);
  });

  it('Should define metadata for method', () => {
    const metadata = Reflect.getMetadata(
      MIDDLEWARE_METADATA,
      new Test()['testMethod'],
    );

    expect(metadata).toEqual([MockMiddleware]);
  });
});
