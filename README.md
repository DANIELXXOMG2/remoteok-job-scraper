# RemoteOK Job Scraper

Scrape data from [RemoteOK](https://remoteok.com/) easily with this scraper. The results are saved in a `JOBS.md` file, grouped by company and sorted by date.

## How to Use

### Local Execution

1.  **Install dependencies:**

    ```bash
    bun install
    ```

2.  **Run the scraper:**

    ```bash
    bun start
    ```

    This will start the scraping process. Once finished, you will find the results in the `JOBS.md` file.

### Apify Platform

To use the RemoteOK Job Scraper on the Apify platform, you need to configure the input in the Apify Console. Go to the actor's page, and in the `Input` tab, specify the search URLs and the maximum number of listings you want to scrape.

#### Example Input

If you want to scrape the latest 500 `java` jobs, the input would look like this:

```json
{
  "searchUrls": [
    {
      "url": "https://remoteok.com/remote-java-jobs?order_by=date"
    }
  ],
  "maxNumberOfListings": 500
}
```

## Data Output

The scraper generates a `JOBS.md` file with the scraped job listings. The jobs are grouped by company and sorted by the most recent date. The output from the Apify platform is stored in a dataset, which can be downloaded in various formats (JSON, CSV, XML, etc.).

### Example `JOBS.md` entry:

```markdown
## Company Name (1)

### [Job Title](https://remoteok.com/remote-jobs/12345-example-job)
**Tags:** Tag1, Tag2
**Location:** Location1, Location2
**Salary:** $50k - $100k
*Posted on: Mon Aug 29 2022*
```

## Support

For custom outputs, bug reports, or any other issues, please contact the developer or open an issue in the repository.
