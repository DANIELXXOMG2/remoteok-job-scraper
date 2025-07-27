import { scrape } from './crawler.js';
import { config } from '../config.js';

await scrape({
  maxConcurrency: config.maxConcurrency,
  proxy: config.proxy,
  urls: config.startUrls,
  maxNumberOfListings: config.maxNumberOfListings,
});
