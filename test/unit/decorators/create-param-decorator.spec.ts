import { HANDLER_ARGS_METADATA } from '../../../lib/constants/decorators';
import createParamDecorator from '../../../lib/decorators/create-param-decorator';
import { HandlerParamMetadata } from '../../../lib/interfaces/handler-param-metadata.interface';

describe('createParamDecorator', () => {
  const MockDecorator = createParamDecorator((options, eventData) => {
    return eventData.pattern;
  });

  class Test {
    public test(@MockDecorator() data: string) {
      return data;
    }
  }

  it('Should gather all properties available in HandlerParamMetadata interface as metadata', () => {
    const instance = new Test();

    const metadata = Reflect.getMetadata(HANDLER_ARGS_METADATA, instance, 'test');

    expect(metadata).toEqual(<HandlerParamMetadata<any>>(<unknown>[
      {
        index: 0,
        options: undefined,
        method: expect.any(Function),
        type: String,
      },
    ]));
  });
});
