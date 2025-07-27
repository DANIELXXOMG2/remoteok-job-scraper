import { Actor } from 'apify';
import { log, Dataset } from 'crawlee';
import { writeFile } from 'fs/promises';
import { scrape } from './crawler.js';
import { buildStartRequests, isRemoteOkUrl } from './urls.js';
import { createMarkdown } from './markdown.js';

// Initialize the Apify SDK
await Actor.init();

const { maxNumberOfListings = 100, debugLog = false, maxConcurrency = 1, searchUrls = [] } = await Actor.getInput();

if (debugLog) {
  log.setLevel(log.LEVELS.DEBUG);
}

const proxy = await Actor.createProxyConfiguration({
  useApifyProxy: true,
  apifyProxyGroups: ['RESIDENTIAL'],
});
const urls = [];

const allUrls = await buildStartRequests(searchUrls);

allUrls
  .filter(url => isRemoteOkUrl(url.url))
  .forEach(url => {
    if (url && url.url) {
      urls.push(url.url);
    }
  });

const jobIds = new Set();

await scrape({ urls, maxNumberOfListings, maxConcurrency, proxy, jobIds });

const dataset = await Dataset.open();
const items = await dataset.getData();
const markdown = await createMarkdown(items.items);

await writeFile('JOBS.md', markdown);

await Actor.exit();
