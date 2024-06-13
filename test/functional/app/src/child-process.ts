global.processType = 'childProcess';

import 'reflect-metadata';
import { BrokerFactory } from 'electron-broker';
import { TestController } from './test-controller';

BrokerFactory.createProcessBroker({
  controllers: [new TestController()],
}).then((broker) => {
  broker.start();
});
