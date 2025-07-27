import { log } from 'crawlee';

export const createMarkdown = async jobs => {
  log.info('Creating markdown...');

  const sortedJobs = jobs.sort((a, b) => new Date(b.time) - new Date(a.time));

  const jobsByCompany = sortedJobs.reduce((acc, job) => {
    if (!acc[job.company]) {
      acc[job.company] = [];
    }
    acc[job.company].push(job);
    return acc;
  }, {});

  let markdown = `# Remote OK Jobs\n\n`;
  markdown += `Found ${sortedJobs.length} jobs\n\n`;

  Object.entries(jobsByCompany).forEach(([company, companyJobs]) => {
    markdown += `## ${company} (${companyJobs.length})\n\n`;
    companyJobs.forEach(job => {
      markdown += `### [${job.title}](${job.url})\n`;
      markdown += `**Tags:** ${job.tags.join(', ')}\n`;
      markdown += `**Location:** ${job.locations.join(', ')}\n`;
      if (job.minSalary) {
        markdown += `**Salary:** ${job.minSalary}`;
        if (job.maxSalary) {
          markdown += ` - ${job.maxSalary}`;
        }
        markdown += `\n`;
      }
      markdown += `*Posted on: ${new Date(job.time).toDateString()}*\n\n`;
    });
  });

  log.info('Markdown created.');

  return markdown;
};
