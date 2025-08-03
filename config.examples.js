/**
 * Ejemplos de Configuración para el Scraper de RemoteOK
 *
 * Este archivo contiene ejemplos de diferentes configuraciones que puedes usar
 * según tus necesidades específicas. Copia y pega la configuración deseada
 * en tu archivo config.js
 */

// ========================================
// EJEMPLO 1: Configuración Básica
// ========================================
export const basicConfig = {
  startUrls: ['https://remoteok.com/'],
  maxNumberOfListings: 50,
  maxConcurrency: 2,
  proxy: undefined,
  performance: {
    batchSize: 25,
    enableDeduplication: true,
    maxRequestQueueSize: 100,
  },
};

// ========================================
// EJEMPLO 2: Scraping de Tecnologías Específicas
// ========================================
export const techSpecificConfig = {
  startUrls: [
    'https://remoteok.com/remote-javascript-jobs',
    'https://remoteok.com/remote-python-jobs',
    'https://remoteok.com/remote-react-jobs',
    'https://remoteok.com/remote-nodejs-jobs',
  ],
  maxNumberOfListings: 100,
  maxConcurrency: 3,
  proxy: undefined,
  performance: {
    batchSize: 20,
    enableDeduplication: true,
    maxRequestQueueSize: 150,
  },
};

// ========================================
// EJEMPLO 3: Scraping Masivo (Alto Volumen)
// ========================================
export const highVolumeConfig = {
  startUrls: [
    'https://remoteok.com/',
    'https://remoteok.com/remote-jobs?order_by=date',
    'https://remoteok.com/remote-jobs?order_by=salary_max',
  ],
  maxNumberOfListings: 500,
  maxConcurrency: 4,
  proxy: undefined,
  performance: {
    batchSize: 50,
    enableDeduplication: true,
    maxRequestQueueSize: 200,
  },
};

// ========================================
// EJEMPLO 4: Configuración Conservadora (Conexión Lenta)
// ========================================
export const conservativeConfig = {
  startUrls: ['https://remoteok.com/'],
  maxNumberOfListings: 25,
  maxConcurrency: 1,
  proxy: undefined,
  performance: {
    batchSize: 10,
    enableDeduplication: true,
    maxRequestQueueSize: 50,
  },
};

// ========================================
// EJEMPLO 5: Con Proxy (Para Apify Platform)
// ========================================
export const proxyConfig = {
  startUrls: ['https://remoteok.com/'],
  maxNumberOfListings: 200,
  maxConcurrency: 3,
  proxy: {
    useApifyProxy: true,
    apifyProxyGroups: ['RESIDENTIAL'],
  },
  performance: {
    batchSize: 25,
    enableDeduplication: true,
    maxRequestQueueSize: 100,
  },
};

// ========================================
// EJEMPLO 6: Búsquedas por Ubicación
// ========================================
export const locationBasedConfig = {
  startUrls: [
    'https://remoteok.com/remote-jobs?location=US',
    'https://remoteok.com/remote-jobs?location=EU',
    'https://remoteok.com/remote-jobs?location=LATAM',
  ],
  maxNumberOfListings: 150,
  maxConcurrency: 3,
  proxy: undefined,
  performance: {
    batchSize: 30,
    enableDeduplication: true,
    maxRequestQueueSize: 120,
  },
};

// ========================================
// EJEMPLO 7: Búsquedas por Rango Salarial
// ========================================
export const salaryBasedConfig = {
  startUrls: [
    'https://remoteok.com/remote-jobs?min_salary=50000',
    'https://remoteok.com/remote-jobs?min_salary=100000',
    'https://remoteok.com/remote-jobs?order_by=salary_max',
  ],
  maxNumberOfListings: 100,
  maxConcurrency: 2,
  proxy: undefined,
  performance: {
    batchSize: 25,
    enableDeduplication: true,
    maxRequestQueueSize: 100,
  },
};

// ========================================
// EJEMPLO 8: Configuración de Desarrollo/Testing
// ========================================
export const developmentConfig = {
  startUrls: ['https://remoteok.com/'],
  maxNumberOfListings: 10, // Pocos trabajos para testing rápido
  maxConcurrency: 1,
  proxy: undefined,
  performance: {
    batchSize: 5,
    enableDeduplication: false, // Deshabilitado para testing
    maxRequestQueueSize: 20,
  },
};

/**
 * INSTRUCCIONES DE USO:
 *
 * 1. Elige la configuración que mejor se adapte a tus necesidades
 * 2. Copia la configuración completa
 * 3. Pégala en tu archivo config.js reemplazando la configuración actual
 * 4. Ajusta los valores según sea necesario
 *
 * NOTAS IMPORTANTES:
 * - maxConcurrency: Más alto = más rápido, pero más uso de recursos
 * - maxNumberOfListings: Controla cuántos trabajos obtener por URL
 * - batchSize: Tamaño de lote para procesamiento, afecta el uso de memoria
 * - proxy: Solo usar si tienes problemas de bloqueo o estás en Apify
 */
