import { ControllerHandlersMetadataReader } from '../../../lib/metadata-readers/controller-handlers-metadata.reader';
import { ControllerMetadataReader } from '../../../lib/metadata-readers/controller-metadata.reader';

describe('ControllersMetadataReader', () => {
  let handlersMetadataReader: ControllerHandlersMetadataReader;
  let controllerMetadataReader: ControllerMetadataReader;

  beforeAll(() => {
    handlersMetadataReader = new ControllerHandlersMetadataReader();
    controllerMetadataReader = new ControllerMetadataReader(handlersMetadataReader);
  });

  describe('read', () => {
    it('Should read handlers metadata', () => {
      const readerSpy = spyOn(handlersMetadataReader, 'read');

      controllerMetadataReader.read({});

      expect(readerSpy).toBeCalled();
    });
  });

  describe('readAll', () => {
    it('Should read metadata of each element in array', () => {
      const readerSpy = spyOn(handlersMetadataReader, 'read');

      controllerMetadataReader.readAll([{}, {}]);

      expect(readerSpy).toBeCalledTimes(2);
    });
  });
});
