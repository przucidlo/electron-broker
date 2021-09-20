import 'reflect-metadata';
import { ExecutionContext } from '../../../lib/controllers/execution-context';

describe('ExecutionContext', () => {
  let executionContext: ExecutionContext;
  const mockHandler = () => '123';
  const mockParamsMetadata = [{}];

  class Test {}

  beforeAll(() => {
    executionContext = new ExecutionContext(
      {
        controller: new Test(),
        handler: mockHandler,
        middleware: [],
        paramsMetadata: mockParamsMetadata as any,
      },
      <any>{},
    );
  });

  describe('getClass', () => {
    it('Should return type of the controller class', () => {
      expect(executionContext.getClass()).toBe(Test);
    });
  });

  describe('getHandler', () => {
    it('Should return reference to the handler function', () => {
      const handler = executionContext.getHandler();
      expect(handler()).toBe(mockHandler());
    });
  });

  describe('getParamMetadata', () => {
    it('Should return array of handler params metadata', () => {
      const metadata = executionContext.getParamsMetadata();

      expect(metadata).toBe(mockParamsMetadata);
    });
  });
});
