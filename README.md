# Pruebas de Rendimiento con K6 - QuickPizza (Arquitectura Modular)

Este proyecto contiene un framework modularizado para realizar pruebas de rendimiento sobre el API de demostración de Grafana `https://quickpizza.grafana.com` utilizando k6.

## Arquitectura del Proyecto

El proyecto está diseñado usando un patrón de "Page Object / API Client" para maximizar la reutilización del código y facilitar el mantenimiento:

- `api/`: Contiene el cliente `PizzaClient.js` que abstrae las llamadas HTTP al API.
- `config/`: Centraliza las variables de entorno (`env.js`) y los umbrales de aceptación (SLAs) de las pruebas (`thresholds.js`).
- `tests/`: Scripts ejecutables (Base, Load, Stress) que importan la configuración y usan el cliente API para orquestar los escenarios.
- `.github/workflows/`: Pipeline de Integración Continua (CI) usando GitHub Actions.

## Tipos de Prueba (Escenarios)

1. **Prueba Base (`tests/base.js`)**: (Smoke Test) 1 usuario. Verifica la corrección del flujo básico y que el API esté respondiendo.
2. **Prueba de Carga (`tests/load.js`)**: (Load Test) Sube hasta 20 usuarios. Simula el tráfico esperado normal.
3. **Prueba de Estrés (`tests/stress.js`)**: (Stress Test) Empuja el sistema hasta 150 usuarios por etapas para encontrar el punto de ruptura.

## Requisitos
- Tener [Docker](https://www.docker.com/products/docker-desktop) o [k6 instalado](https://grafana.com/docs/k6/latest/get-started/installation/).

## Cómo ejecutar usando Docker

Evita instalar dependencias y corre los scripts usando la imagen oficial de Grafana en Docker. 

Asegúrate de estar en la raíz de tu proyecto y ejecuta el archivo `.js` directamente dentro del contenedor:

```bash
# Prueba rápida (Smoke)
docker run --rm -i -v ${PWD}:/app -w /app grafana/k6 run tests/base.js

# Prueba de carga moderada
docker run --rm -i -v ${PWD}:/app -w /app grafana/k6 run tests/load.js

# Prueba pesada (Estrés)
docker run --rm -i -v ${PWD}:/app -w /app grafana/k6 run tests/stress.js
```

### Usando Docker Compose

Opcionalmente, puedes utilizar el archivo `docker-compose.yml` que facilita la ejecución. Puedes abrir ese archivo y modificar la variable `command` para indicar qué prueba ejecutar.

Construir la imagen y ejecutar:
```bash
docker-compose build
docker-compose up
```

## Integración Continua (CI/CD)
Este proyecto incluye un workflow en `.github/workflows/k6-load-test.yml`.
Cada vez que haces *push* o un Pull Request hacia la rama principal (`trunk`), GitHub Actions ejecutará automáticamente la prueba Base (Smoke test) para asegurar que no se hayan introducido regresiones de rendimiento.