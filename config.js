/**
 * Configuración del Scraper de RemoteOK
 *
 * Este archivo contiene todas las configuraciones principales del scraper.
 * Puedes modificar estos valores según tus necesidades específicas.
 */

export const config = {
  // ========================================
  // CONFIGURACIÓN DE URLs
  // ========================================

  /**
   * URLs a scrapear - Puedes agregar múltiples URLs aquí
   *
   * Ejemplos de URLs válidas:
   * - 'https://remoteok.com/' (todos los trabajos)
   * - 'https://remoteok.com/remote-javascript-jobs' (trabajos de JavaScript)
   * - 'https://remoteok.com/remote-python-jobs' (trabajos de Python)
   * - 'https://remoteok.com/remote-jobs?order_by=date' (ordenados por fecha)
   */
  startUrls: [
    'https://remoteok.com/',
  ],

  // ========================================
  // CONFIGURACIÓN DE SCRAPING
  // ========================================

  /**
   * Número máximo de trabajos a scrapear por cada URL
   * Recomendado: 50-200 para uso normal, 500+ para análisis extensos
   */
  maxNumberOfListings: 100,

  /**
   * Concurrencia máxima del crawler (páginas procesadas simultáneamente)
   * Recomendado: 2-4 para conexiones estables, 1-2 para conexiones lentas
   */
  maxConcurrency: 3,

  // ========================================
  // CONFIGURACIÓN DE PROXY
  // ========================================

  /**
   * Configuración de proxy (opcional)
   *
   * Opciones disponibles:
   * - undefined: Sin proxy (recomendado para uso local)
   * - { useApifyProxy: true }: Usar Apify Proxy (solo en plataforma Apify)
   * - { proxyUrls: ['http://user:pass@proxy1.com:8000'] }: Proxies personalizados
   */
  proxy: undefined,

  // ========================================
  // OPTIMIZACIONES DE RENDIMIENTO
  // ========================================

  /**
   * Configuraciones avanzadas para optimizar el rendimiento
   * No modificar a menos que sepas lo que haces
   */
  performance: {
    /** Tamaño de lote para procesamiento de trabajos */
    batchSize: 25,

    /** Habilitar deduplicación de requests */
    enableDeduplication: true,

    /** Tamaño máximo de la cola de requests */
    maxRequestQueueSize: 100,
  },
};
