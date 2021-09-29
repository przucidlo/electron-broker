import { BrowserWindow } from 'electron';
import { BrokerRendererAdapter } from '../../../../lib/core/adapters/broker/broker-renderer.adapter';
import { ipcMain } from '../../__mocks__/electron-mock';

describe('BrokerRendererAdapter', () => {
  let browserWindow: BrowserWindow;
  let rendererAdapter: BrokerRendererAdapter;

  beforeEach(() => {
    browserWindow = <BrowserWindow>{
      webContents: <Electron.WebContents>(<unknown>{ send: jest.fn() }),
    };

    rendererAdapter = new BrokerRendererAdapter(browserWindow);
  });

  describe('send', () => {
    it('Should use BrowserWindow.webContents.send method to send a message to renderer process', () => {
      const pattern = 'pattern';
      const data = {};

      rendererAdapter.send(pattern, data);

      expect(browserWindow.webContents.send).toBeCalledWith(pattern, data);
    });
  });

  describe('register', () => {
    it('Should use ipcMain.on to listen for mesages coming from renderer process', () => {
      const pattern = 'pattern';
      const listener = () => ({});

      rendererAdapter.register(pattern, listener);

      expect(ipcMain.on).toBeCalledWith(pattern, listener);
    });
  });
});
