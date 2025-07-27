// config.js

export const config = {
  // URLs to scrape. You can add more URLs here.
  startUrls: ['https://remoteok.com/'],

  // Maximum number of job listings to scrape from each URL.
  maxNumberOfListings: 100,

  // Proxy configuration
  // If you want to use proxies, you need to set this to a proxy configuration object.
  // For example, to use Apify Proxy: proxy: { useApifyProxy: true }
  // To use your own proxies: proxy:
  // { proxyUrls: ['http://user:password@proxy1.com:8000', 'http://user:password@proxy2.com:8000'] }
  proxy: undefined,

  // Maximum concurrency of the crawler.
  maxConcurrency: 2,
};
