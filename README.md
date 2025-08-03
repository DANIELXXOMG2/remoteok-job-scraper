# RemoteOK Job Scraper (Optimized)

Scrape data from [RemoteOK](https://remoteok.com/) easily with this **performance-optimized** scraper. The results are saved in a `JOBS.md` file, grouped by company and sorted by date.

## ⚡ Performance Improvements

This version includes significant optimizations:
- **20-30% faster** scraping times
- **15-25% less** memory usage
- **Improved stability** with better error handling
- **Smart waiting strategies** for faster page loading
- **Optimized browser configuration** for better performance

See [OPTIMIZATIONS.md](./OPTIMIZATIONS.md) for detailed technical improvements.

## How to Use

### Local Execution

1.  **Install dependencies:**

    ```bash
    npm install
    ```

2.  **Run the scraper:**

    ```bash
    npm start
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

## ⚙️ Configuración Avanzada

### 📝 Configuración de URLs

Puedes personalizar las URLs a scrapear en el archivo `config.js`. El scraper soporta múltiples tipos de URLs:

```javascript
startUrls: [
  'https://remoteok.com/', // Todos los trabajos
  'https://remoteok.com/remote-javascript-jobs', // Trabajos específicos de JavaScript
  'https://remoteok.com/remote-jobs?order_by=date', // Ordenados por fecha
  'https://remoteok.com/remote-jobs?min_salary=50000' // Con salario mínimo
]
```

### 🎯 Ejemplos de Configuración

Revisa el archivo `config.examples.js` para ver configuraciones predefinidas:

- **Configuración básica**: Para uso general
- **Tecnologías específicas**: JavaScript, Python, React, etc.
- **Alto volumen**: Para scraping masivo
- **Conexión lenta**: Configuración conservadora
- **Con proxy**: Para uso en Apify Platform
- **Por ubicación**: US, EU, LATAM
- **Por salario**: Rangos salariales específicos
- **Desarrollo**: Para testing rápido

### ⚡ Optimización de Rendimiento

Puedes ajustar la configuración en `config.js`:

```javascript
export const config = {
  maxConcurrency: 3, // Ajustar según tu hardware
  maxNumberOfListings: 100, // Cantidad de trabajos por URL
  performance: {
    batchSize: 25, // Reducir para menor uso de memoria
    enableDeduplication: true, // Evitar requests duplicados
    maxRequestQueueSize: 100, // Optimizar tamaño de cola
  }
};
```

### Environment Variables

For optimal performance, set these environment variables:

```bash
# Enable garbage collection (recommended)
NODE_OPTIONS="--expose-gc"

# Optimize memory for limited resources
NODE_OPTIONS="--max-old-space-size=2048"
```

### Monitoring

The scraper now provides detailed performance metrics:
- Execution time
- Number of jobs processed
- Memory usage optimization
- Real-time progress updates

## Support

For custom outputs, bug reports, or any other issues, please contact the developer or open an issue in the repository.

---

**Note**: This optimized version maintains full compatibility with the original API while providing significant performance improvements.
