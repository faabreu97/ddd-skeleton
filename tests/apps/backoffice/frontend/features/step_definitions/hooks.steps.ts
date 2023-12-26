import { AfterAll, BeforeAll, setDefaultTimeout } from '@cucumber/cucumber';
import {
  BrowserContext,
  ChromiumBrowser,
  LaunchOptions,
  Page,
  chromium
} from '@playwright/test';
import { BackofficeBackendApp } from '../../../../../../src/apps/backoffice/backend/BackofficeBackendApp';
import container from '../../../../../../src/apps/backoffice/backend/dependency-injection';
import { EnvironmentArranger } from '../../../../../Contexts/Shared/infrastructure/arranger/EnvironmentArranger';

const browserOptions: LaunchOptions = {
  slowMo: 0,
  args: [
    '--use-fake-ui-for-media-stream',
    '--use-fake-device-for-media-stream'
  ],
  firefoxUserPrefs: {
    'media.navigator.streams.fake': true,
    'media.navigator.permission.disabled': true
  }
};

const config = {
  browser: 'chromium',
  browserOptions
};

let browser: ChromiumBrowser;
let page: Page;
let context: BrowserContext;
let application: BackofficeBackendApp;
let environmentArranger: EnvironmentArranger;

setDefaultTimeout(process.env.PWDEBUG ? -1 : 60 * 1000);

BeforeAll(async function (this: any) {
  browser = await chromium.launch(config.browserOptions);
  context = await browser.newContext({
    recordVideo: !process.env.CI ? { dir: `${__dirname}/videos` } : undefined
  });
  page = await context.newPage();

  environmentArranger = await container.get<Promise<EnvironmentArranger>>(
    'Backoffice.EnvironmentArranger'
  );
  await environmentArranger.arrange();

  application = new BackofficeBackendApp();
  await application.start();
});

AfterAll(async function () {
  await browser.close();
  await environmentArranger.arrange();
  await environmentArranger.close();

  await application.stop();
});

export { page };
