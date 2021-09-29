import { BrokerMainAdapter } from '../../../../lib/core/adapters/broker/broker-main.adapter';
import { clearElectronMock, ipcMain } from '../../__mocks__/electron-mock';

describe('BrokerMainAdapter', () => {
  beforeEach(() => {
    clearElectronMock();
  });

  describe('send', () => {
    it('Should send message across main process listeners', () => {
      const pattern = '123';
      const data = {};

      new BrokerMainAdapter().send(pattern, data);

      expect(ipcMain.emit).toBeCalledWith(pattern, undefined, data);
    });
  });
});
