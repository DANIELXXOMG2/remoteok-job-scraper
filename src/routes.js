import { Dataset, createPlaywrightRouter } from 'crawlee';

const getAtt = (el, attName) => el.attributes.find(x => x.name === attName)?.value;

export const createRouter = ({ maxOffset, jobIds }) => {
  const router = createPlaywrightRouter();

  const getJobData = (el, $) => {
    const id = $(el).attr('data-id');
    const company = $(el).attr('data-company');
    const url = $(el).attr('data-url');
    let title = '';
    const tags = [];
    let time = '';

    // Validate required fields
    if (!id || !company || !url) {
      return null;
    }
    $('h2', el).each((_, h2) => {
      title = h2.firstChild?.data?.trim();
    });

    $('.tag h3', el).each((_, ele) => {
      const tag = ele?.firstChild?.data?.trim();
      if (tag) {
        tags.push(tag);
      }
    });

    $('.time time', el).each((_, timeEl) => {
      time = getAtt(timeEl, 'datetime');
    });

    const locationsEl = $('.location', el).get();
    const locations = [];
    let minSalary = '';
    let maxSalary = '';
    let contractType = '';

    for (let i = 0; i < locationsEl.length; i += 1) {
      const location = locationsEl[i]?.firstChild?.data?.trim();

      if (location && location.includes('💰')) {
        const moneyText = location.replace('💰 ', '').replace('*', '').split(' - ');
        if (moneyText.length === 2) {
          [minSalary, maxSalary] = moneyText;
        } else if (moneyText.length === 1) {
          [minSalary] = moneyText;
        }
      } else if (location && location.includes('⏰')) {
        contractType = location.replace('⏰', '').trim();
      } else if (location) {
        locations.push(location);
      }
    }

    return {
      id,
      company,
      url: `https://remoteok.com${url}`,
      title,
      tags,
      time,
      locations,
      minSalary,
      maxSalary,
      contractType,
    };
  };

  router.addDefaultHandler(async ({ request, log, page, parseWithCheerio, crawler }) => {
    log.info(`Processing page ${request.url}`);

    // Optimized waiting strategy
    try {
      await page.waitForSelector('tr.job', { timeout: 10000 });
    } catch (error) {
      log.warning('Jobs not found, using fallback timeout');
      await page.waitForTimeout(5000);
    }
    
    const $ = await parseWithCheerio();

    let pageOffset = parseInt(new URL(request.url).searchParams.get('offset'), 10) || 0;

    if (pageOffset > 0) {
      pageOffset -= 1;
    }

    let currentOffset = 0;
    const jobs = [];
    const jobElements = $('tr.job').get();
    
    // Process jobs synchronously for better performance
    for (const el of jobElements) {
      currentOffset = pageOffset + parseInt($(el).attr('data-offset'), 10);
      
      if (currentOffset > maxOffset) {
        break; // Early exit when we reach the limit
      }
      
      const job = getJobData(el, $);
      
      // Skip if job data is invalid or already processed
      if (!job || jobIds.has(job.id)) {
        continue;
      }
      
      job.offset = currentOffset;

      // Optimized description extraction
      const descriptionHtml = $(`tr.expand-${job.id} div.html`).text().trim();
      const descriptionMarkdown = $(`tr.expand-${job.id} div.markdown`).text().trim();
      job.description = descriptionHtml || descriptionMarkdown || '';

      jobIds.add(job.id);
      jobs.push(job);
    }

    const url = new URL(request.url);
    url.searchParams.set('offset', currentOffset + 1);

    await Dataset.pushData(jobs);

    if (currentOffset < maxOffset) {
      const requests = [];
      requests.push({
        url: url.toString(),
      });
      await crawler.addRequests(requests);
    }
  });

  return router;
};
