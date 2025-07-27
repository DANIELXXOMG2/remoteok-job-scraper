import { PlaywrightCrawler } from 'crawlee';
import { chromium } from 'playwright-extra';
import stealthPlugin from 'puppeteer-extra-plugin-stealth';
import { createRouter } from './routes.js';

chromium.use(stealthPlugin());

export const scrape = async ({ urls, maxNumberOfListings, maxConcurrency = 1, proxy, jobIds }) => {
  const router = createRouter({ maxOffset: maxNumberOfListings, jobIds });
  const crawler = new PlaywrightCrawler({
    launchContext: {
      launcher: chromium,
      // Here you can set options that are passed to the playwright .launch() function.
      launchOptions: {
        headless: true,
      },
    },
    proxyConfiguration: proxy,
    requestHandler: router,
    requestHandlerTimeoutSecs: 300,
    maxRequestRetries: 3,
    maxConcurrency,
    useSessionPool: true,
    persistCookiesPerSession: true,
    sessionPoolOptions: {
      maxPoolSize: 50,
      sessionOptions: {
        maxUsageCount: 1,
      },
    },
  });

  await crawler.run(urls);
};
