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

    it('Should save the type of the constructor', () => {
      class Test {}

      const metadata = controllerMetadataReader.read(new Test());

      expect(metadata).toEqual(expect.objectContaining({ type: Test }));
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
