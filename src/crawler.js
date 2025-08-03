import { PlaywrightCrawler } from 'crawlee';
import { chromium } from 'playwright-extra';
import stealthPlugin from 'puppeteer-extra-plugin-stealth';
import { createRouter } from './routes.js';

// Configure stealth plugin to avoid detection
chromium.use(stealthPlugin());

export const scrape = async ({ urls, maxNumberOfListings, maxConcurrency = 1, proxy, jobIds }) => {
  const router = createRouter({ maxOffset: maxNumberOfListings, jobIds });
  const crawler = new PlaywrightCrawler({
    launchContext: {
      launcher: chromium,
      // Optimized launch options for better performance
      launchOptions: {
        headless: true,
        args: [
          '--no-sandbox',
          '--disable-setuid-sandbox',
          '--disable-dev-shm-usage',
          '--disable-accelerated-2d-canvas',
          '--no-first-run',
          '--no-zygote',
          '--disable-gpu',
          '--memory-pressure-off'
        ],
      },
    },
    proxyConfiguration: proxy,
    requestHandler: router,
    requestHandlerTimeoutSecs: 180, // Reduced timeout
    maxRequestRetries: 2, // Reduced retries
    maxConcurrency,
    useSessionPool: true,
    persistCookiesPerSession: false, // Disabled to save memory
    sessionPoolOptions: {
      maxPoolSize: Math.min(20, maxConcurrency * 5), // Optimized pool size
      sessionOptions: {
        maxUsageCount: 3, // Increased reuse
      },
    },
    // Additional optimizations
    keepAlive: false,
  });

  await crawler.run(urls);
};
