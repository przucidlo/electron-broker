import { test as base, _electron as electron } from '@playwright/test';
import { BrokerPage } from './broker-page';
import path from 'path';
import { findFilePath } from '../utilities/findFilePath';

export interface Fixtures {
  brokerPage: BrokerPage;
}

const appOutPath = path.join(__dirname, '../app/out');
const mainFilePath = findFilePath('main.js', appOutPath);

export const test = base.extend<Fixtures>({
  brokerPage: [
    async ({}, use) => {
      const app = await electron.launch({
        args: [path.join(appOutPath, mainFilePath)],
        env: {
          ...process.env,
        },
      });

      const brokerPage = new BrokerPage(await app.firstWindow());

      await use(brokerPage);

      await app.close();
    },
    { auto: true },
  ],
});

export { expect } from '@playwright/test';
