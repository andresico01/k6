import http from 'k6/http';

import exec from 'k6/execution';

/**
 * Clase para poder invocar Api Rest
 */
export class PlaceHolderClient {
  constructor(baseUrl, headers) {
    this.baseUrl = baseUrl;
    this.headers = headers; 
    this.body = null;
  }

  /**
   * Metodo para insertar Body en peticion
   * @param {object} body - Body de la peticion
   */
  setBody(body) {
    this.body = body;
    return this;
  }

  _validateAndSend(method, path, body) {
    if (method !== 'GET' && body === null) {
      exec.test.abort(`Fallo Crítico: El método ${method} requiere un Body.`);
    }

    const url = this.baseUrl + path;
    const params = { headers: this.headers };
    const res = http.request(method, url, body, params);
    return res;
  }

  /**
   * Metodo para poder invocar una Api Get
   * @param {string} path - Ruta de la Api a invocar
   * @returns {object} - Respuesta de la Api
   */
  getMethod(path) {
    return this._validateAndSend('GET',path);
  
  }

  postMethod(path) {
   
    return this._validateAndSend('POST',path,this.body);
  }
  

}
