import { sleep,check } from 'k6';
import { ENV,HEADERS } from '../config/env.js';
import { thresholds } from '../config/thresholds.js';
import { PlaceHolderClient } from '../api/placeHolderClient.js';
import { configureReporter} from '../utils/reporter.js';

export const handleSummary = configureReporter('carga');

export const options = {
  
  stages: [
    { duration: '30s', target: 20 }, 
    { duration: '1m', target: 20 },  
    { duration: '30s', target: 0 },  
  ],
  thresholds: thresholds.load,
};

export default function () {
  const client = new PlaceHolderClient(ENV.BASE_URL,HEADERS);
  const id = Math.floor(Math.random() * 100);
  const response = client.getMethod(`/todos/${id}`);
  check(response, { [`status is 200`]: (r) => r.status === 200 });
  sleep(1);
  
}
