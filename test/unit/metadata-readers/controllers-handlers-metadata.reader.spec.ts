import 'reflect-metadata';
import { MessagePattern } from '../../../lib';
import { Data } from '../../../lib/decorators/data.decorator';
import { isHandlerParamMetadata } from '../../../lib/interfaces/handler-param-metadata.interface';
import { ControllerHandlersMetadataReader } from '../../../lib/metadata-readers/controller-handlers-metadata.reader';

describe('ControllersHandlersMetadataReader', () => {
  let metadataReader: ControllerHandlersMetadataReader;

  beforeEach(() => {
    metadataReader = new ControllerHandlersMetadataReader();
  });

  describe('read', () => {
    it('Should ignore constructor and read only functions', () => {
      class Test {
        constructor(private a: string) {}
      }

      const handlersMetadata = metadataReader.read(new Test('test'));

      expect(handlersMetadata).toEqual({});
    });

    it('Should ignore function if its not a valid message handler', () => {
      class Test {
        // eslint-disable-next-line @typescript-eslint/no-empty-function
        public plainFunction(): void {}
      }
      const handlersMetadata = metadataReader.read(new Test());

      expect(handlersMetadata).toEqual({});
    });

    describe('Should read handler metadata', () => {
      const pattern = 'message-pattern';

      class Test {
        @MessagePattern(pattern)
        public coolHandler(@Data() data: string): string {
          return 'text';
        }
      }

      it('Should read and save reference to handler function', () => {
        const testClassObject = new Test();

        const handlersMetadata = metadataReader.read(testClassObject);

        expect(handlersMetadata[pattern].handler('')).toStrictEqual(testClassObject.coolHandler(''));
      });

      it('Should read and save param metadata', () => {
        const paramsHandlersMetadata = metadataReader.read(new Test())[pattern].paramsMetadata;

        expect(isHandlerParamMetadata(paramsHandlersMetadata[0])).toBe(true);
      });
    });
  });
});
