import { BrokerListener } from '../../../../lib/core/client/listener-adapter/adapters/broker-listener';
import { clearElectronMock, ipcMain } from '../../__mocks__/electron-mock';

describe('BrokerListener', () => {
  let brokerListener: BrokerListener;

  beforeEach(() => {
    clearElectronMock();

    brokerListener = new BrokerListener();
  });

  describe('listen', () => {
    it('Should call ipcMain.on for provided pattern and listener', () => {
      const pattern = 'test';

      brokerListener.listen(pattern, () => ({}));

      expect(ipcMain.on).toBeCalledWith(pattern, expect.any(Function));
    });

    it('Should call provided listener when it receives a message', () => {
      const pattern = 'test';
      const listener = jest.fn();

      brokerListener.listen(pattern, listener);

      const wrappedListener = (<jest.Mock>(<unknown>ipcMain.on)).mock
        .calls[0][1];
      wrappedListener();

      expect(listener).toBeCalled();
    });
  });

  describe('removeListener', () => {
    it('Should call ipcMain.removeListener to remove listener', () => {
      const pattern = 'test';

      brokerListener.listen(pattern, () => ({}));

      brokerListener.removeListener();

      expect(ipcMain.removeListener).toBeCalledWith(
        pattern,
        expect.any(Function),
      );
    });
  });
});
