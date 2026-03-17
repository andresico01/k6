import { sleep } from 'k6';
import { ENV,HEADERS } from '../config/env.js';
import { thresholds } from '../config/thresholds.js';
import { PlaceHolderClient } from '../api/placeHolderClient.js';
import { configureReporter} from '../utils/reporter.js';

export const handleSummary = configureReporter('Estres');

export const options = {
  stages: [
    { duration: '30s', target: 50 },  // Subida a 50
    { duration: '1m', target: 50 },   // Mantener 50
    { duration: '30s', target: 100 }, // Subida a 100
    { duration: '1m', target: 100 },  // Mantener 100
    { duration: '30s', target: 150 }, // Subida a 150 (Estrés)
    { duration: '1m', target: 150 },  // Mantener 150
    { duration: '1m', target: 0 },    // Bajada a 0
  ],
  thresholds: thresholds.stress,
};

export default function () {
  const client = new PlaceHolderClient(ENV.BASE_URL,HEADERS);
  client.getMethod("/todos/2");
  sleep(1);
}


