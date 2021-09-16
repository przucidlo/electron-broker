import { ipcRenderer } from 'electron';
import { RendererListener } from '../../../../lib/client/listener-adapter/adapters/renderer-listener';
import { clearElectronMock } from '../../__mocks__/electron-mock';

describe('RendererListener', () => {
  let rendererListener: RendererListener;

  beforeEach(() => {
    clearElectronMock();

    rendererListener = new RendererListener();
  });

  describe('listen', () => {
    it('Should call ipcRenderer.on for provided pattern and listener', () => {
      const pattern = 'test';

      // eslint-disable-next-line @typescript-eslint/no-empty-function
      rendererListener.listen(pattern, () => {});

      expect(ipcRenderer.on).toBeCalledWith(pattern, expect.any(Function));
    });

    it('Should call provided listener when it receives a message', () => {
      const pattern = 'test';
      const listener = jest.fn();

      rendererListener.listen(pattern, listener);

      const wrappedListener = (<jest.Mock>(<unknown>ipcRenderer.on)).mock
        .calls[0][1];
      wrappedListener();

      expect(listener).toBeCalled();
    });
  });

  describe('removeListener', () => {
    it('Should call ipcRenderer.removeListener to remove listener', () => {
      const pattern = 'test';

      // eslint-disable-next-line @typescript-eslint/no-empty-function
      rendererListener.listen(pattern, () => {});

      rendererListener.removeListener();

      expect(ipcRenderer.removeListener).toBeCalledWith(
        pattern,
        expect.any(Function),
      );
    });
  });
});
