import { htmlReport } from 'https://raw.githubusercontent.com/benc-uk/k6-reporter/main/dist/bundle.js';

/**
 * Metodo para poder generar reportes html
 * @param {string} testType - Tipo de prueba Linea base, Carga, Estrés
 * @returns {object} - Reporte html
 */
export const configureReporter = (testType) => {
  return (data) => {
    return {
        [`reporte_${testType.toLowerCase().replace(/\s+/g, '_')}.html`]: htmlReport(data, { title: testType }),
            'stdout': 'Reporte generado con éxito.'
    }
  }
}
    