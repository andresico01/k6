import { sleep } from 'k6';
import { ENV,HEADERS } from '../config/env.js';
import { thresholds } from '../config/thresholds.js';
import { PlaceHolderClient } from '../api/placeHolderClient.js';
import { configureReporter} from '../utils/reporter.js';

export const handleSummary = configureReporter('Linea Base');

// 1. Instanciamos el cliente en el Init Context (fuera de las funciones)
const client = new PlaceHolderClient(ENV.BASE_URL, HEADERS);
const payload = {
    title: 'foo',
    body: 'bar',
    userId: 1
  };

export const options = {
  scenarios: {
    // Escenario 1: Consultas GET
    consulta_tareas: {
      exec: 'getFlow',       // Nombre de la función a ejecutar
      executor: 'constant-vus',
      vus: 1,
      duration: '10s',
    },
    // Escenario 2: Creación POST (al mismo tiempo)
    creacion_tareas: {
      exec: 'postFlow',      // Nombre de la otra función
      executor: 'constant-vus',    // Puedes usar ejecutores distintos
      vus: 1,
      duration: '10s',
    },
  },
  thresholds: thresholds.base,
};

// 2. Definimos las funciones con nombre (no son default)

export function getFlow() {
  const id = Math.floor(Math.random() * 100);
  console.log(`[GET] Consultando id: ${id}`);
  client.getMethod(`/todos/${id}`);
  sleep(1);
}

export function postFlow() {
  console.log(`[POST] Creando nueva tarea`);
  client.setBody(payload).postMethod('/todos');
  sleep(2);
}