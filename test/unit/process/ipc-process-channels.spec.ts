import { IpcProcessChannels } from '../../../lib/core/process/ipc-process-channels';

describe('IpcProcessChannels', () => {
  let ipcProcessChannels: IpcProcessChannels;

  beforeEach(() => {
    ipcProcessChannels = new IpcProcessChannels();
  });

  describe('removeChannel', () => {
    it('Should remove channel', () => {
      const channel = 'test';
      const listener = () => ({});
      const otherListener = () => ({});

      ipcProcessChannels.addChannel(channel, listener);
      ipcProcessChannels.addChannel(channel, otherListener);
      ipcProcessChannels.addChannel(channel, otherListener);

      ipcProcessChannels.removeChannel(channel, listener);

      expect(
        ipcProcessChannels.getChannelListenersByName(channel),
      ).toHaveLength(2);
    });

    it('Should remove nothing if listener reference does not match', () => {
      const channel = 'test';
      const listener = () => ({});

      ipcProcessChannels.addChannel(channel, listener);
      ipcProcessChannels.removeChannel(channel, () => ({}));

      expect(
        ipcProcessChannels.getChannelListenersByName(channel),
      ).toHaveLength(1);
    });

    it('Should not throw on attempt to remove non existing channel', () => {
      expect(() =>
        ipcProcessChannels.removeChannel('test', () => ({})),
      ).not.toThrowError(TypeError);
    });
  });

  describe('getChannelListenersByName', () => {
    it('Should return listeners', () => {
      const channel = 'test';
      const listener = () => ({});

      ipcProcessChannels.addChannel(channel, listener);

      expect(ipcProcessChannels.getChannelListenersByName(channel)[0]).toBe(
        listener,
      );
    });

    it('Should return empty array if there is no listeners', () => {
      expect(
        ipcProcessChannels.getChannelListenersByName('anything'),
      ).toHaveLength(0);
    });
  });
});
