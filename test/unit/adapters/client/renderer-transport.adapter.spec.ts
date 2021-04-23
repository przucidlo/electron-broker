import { RendererTransportAdapter } from '../../../../lib/adapters/client/renderer-transport.adapter';
import { clearElectronMock, ipcRenderer } from '../../__mocks__/electron-mock';

describe('RendererTransportAdapter', () => {
  const pattern = '123';
  const data = {};

  let transportAdapter: RendererTransportAdapter;

  beforeEach(() => {
    clearElectronMock();

    transportAdapter = new RendererTransportAdapter();
  });

  describe('send', () => {
    it('Should use ipcRenderer.send method to send a message to main process', () => {
      transportAdapter.send(pattern, data);

      expect(ipcRenderer.send).toBeCalledWith(pattern, data);
    });
  });

  describe('register', () => {
    it('Should use ipcRender.on to register a listener for provided pattern', () => {
      transportAdapter.register(pattern, () => ({}));

      expect(ipcRenderer.on).toBeCalledWith(pattern, expect.any(Function));
    });

    it('Should execute provided listener if message arrives', () => {
      const registerSpy = jest.spyOn(transportAdapter, 'register');
      const listener = jest.fn();

      transportAdapter.register(pattern, listener);

      const internalListener = registerSpy.mock.calls[0][1];
      internalListener();

      expect(listener).toBeCalled();
    });
  });
});
