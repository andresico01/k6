FROM grafana/k6:latest

# Establece el directorio de trabajo dentro del contenedor
WORKDIR /app

# Copia los archivos del proyecto al contenedor

COPY config/ /app/config/
COPY api/ /app/api/
COPY tests/ /app/tests/


