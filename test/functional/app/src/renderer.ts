import 'reflect-metadata';
import { BrokerFactory } from 'electron-broker';
import { TestController } from './test-controller';

BrokerFactory.createRendererBroker({
  secure: true,
  controllers: [new TestController()],
}).then((broker) => {
  broker.start();

  window.broker = broker;
});
