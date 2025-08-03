import { Actor } from 'apify';
import { log, Dataset } from 'crawlee';
import { writeFile } from 'fs/promises';
import { scrape } from './crawler.js';
import { buildStartRequests, isRemoteOkUrl } from './urls.js';
import { createMarkdown } from './markdown.js';
import { config } from '../config.js';

// Initialize the Apify SDK
await Actor.init();

// Use optimized defaults from config
const input = await Actor.getInput() || {};
const { 
  maxNumberOfListings = config.maxNumberOfListings, 
  debugLog = false, 
  maxConcurrency = config.maxConcurrency, 
  searchUrls = config.startUrls 
} = input;

if (debugLog) {
  log.setLevel(log.LEVELS.DEBUG);
} else {
  // Optimize logging for performance
  log.setLevel(log.LEVELS.INFO);
}

// Optimized proxy configuration
const proxy = config.proxy || await Actor.createProxyConfiguration({
  useApifyProxy: false, // Disabled by default for better performance
});
const urls = [];

// Handle different input formats
let processedSearchUrls = searchUrls;
if (Array.isArray(searchUrls) && searchUrls.length > 0) {
  // If searchUrls are simple strings, convert to expected format
  if (typeof searchUrls[0] === 'string') {
    processedSearchUrls = searchUrls.map(url => ({ url }));
  }
}

const allUrls = await buildStartRequests(processedSearchUrls);

allUrls
  .filter(urlObj => urlObj && isRemoteOkUrl(urlObj.url))
  .forEach(urlObj => {
    if (urlObj && urlObj.url) {
      urls.push(urlObj.url);
    }
  });

const jobIds = new Set();

// Add performance monitoring
const startTime = Date.now();
log.info(`Starting scrape with ${urls.length} URLs, max ${maxNumberOfListings} listings, concurrency ${maxConcurrency}`);

await scrape({ urls, maxNumberOfListings, maxConcurrency, proxy, jobIds });

// Optimized data processing
const dataset = await Dataset.open();
const items = await dataset.getData();

log.info(`Scraped ${items.items.length} jobs in ${(Date.now() - startTime) / 1000}s`);

// Process markdown generation
if (items.items.length > 0) {
  const markdown = await createMarkdown(items.items);
  await writeFile('JOBS.md', markdown);
  log.info('Markdown file created successfully');
} else {
  log.warning('No jobs found to process');
}

// Clean up memory
if (global.gc) {
  global.gc();
}

await Actor.exit();
