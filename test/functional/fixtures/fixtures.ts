import { test as base, _electron as electron } from '@playwright/test';
import { BrokerPage } from './broker-page';
import path from 'path';

export interface Fixtures {
  brokerPage: BrokerPage;
}

export const test = base.extend<Fixtures>({
  brokerPage: [
    async ({}, use) => {
      const mainPath = process.env.CI
        ? '../app/out/app-linux-x64/resources/app/.vite/build/main.js'
        : '../app/out/app-darwin-arm64/app.app/Contents/Resources/app/.vite/build/main.js';

      const app = await electron.launch({
        args: [path.join(__dirname, mainPath)],
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
