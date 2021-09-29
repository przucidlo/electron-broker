import { IpcProcessChannels } from '../../../lib/core/process/ipc-process-channels';
import { IpcProcessMessage } from '../../../lib/core/process/ipc-process-message.interface';
import { IpcProcessMessageListener } from '../../../lib/core/process/ipc-process-message.listener';
import { MessageHandler } from '../../../lib/core/types/message-handler.type';
import { mockProcess } from './mocks/mock-process';

describe('IpcProcessMessageListener', () => {
  let ipcProcessMessageListener: IpcProcessMessageListener;
  let ipcProcessChannels: IpcProcessChannels;
  let process: NodeJS.Process;

  beforeEach(() => {
    process = mockProcess();
    ipcProcessChannels = new IpcProcessChannels();
    ipcProcessMessageListener = new IpcProcessMessageListener(
      process,
      ipcProcessChannels,
    );

    ipcProcessMessageListener.start();
  });

  describe('start', () => {
    it('Should register message listener', () => {
      expect(process.on).toBeCalledWith('message', expect.any(Function));
    });
  });

  describe('after receiving message', () => {
    const mockChannel = 'mock-channel';
    const mockListener = jest.fn();
    const mockPayload = { test: 'test' };

    const mockMessage: IpcProcessMessage = {
      messageId: '1',
      channelName: mockChannel,
      payload: mockPayload,
    };

    let messageListener: MessageHandler;

    beforeEach(() => {
      messageListener = (<jest.Mock>process.on).mock.calls[0][1];

      ipcProcessChannels.addChannel(mockChannel, mockListener);
    });

    it('Should deny any message that isnt an instance of IpcProcessMessage', () => {
      const channelsSpy = jest.spyOn(
        ipcProcessChannels,
        'getChannelListenerByName',
      );

      messageListener({ whatever: 'param' });

      expect(channelsSpy).not.toBeCalled();
    });

    it('Should call channel listener method', () => {
      messageListener(mockMessage);

      expect(mockListener).toBeCalled();
    });

    it('Should send response with listener result, to parent process', async () => {
      const mockReturnValue = 'mock-return-value';
      mockListener.mockReturnValueOnce(mockReturnValue);

      messageListener(mockMessage);

      await new Promise((resolve) => resolve({}));

      expect(process.send).toBeCalledWith(
        expect.objectContaining({
          messageId: mockMessage.messageId,
          payload: mockReturnValue,
        }),
      );
    });

    afterEach(() => {
      mockListener.mockClear();
    });
  });
});
