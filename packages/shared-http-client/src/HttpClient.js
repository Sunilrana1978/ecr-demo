import axios from 'axios';
import { ServiceError } from '@shared/errors';

export class HttpClient {
  constructor(baseUrl, serviceName, options = {}) {
    this.baseUrl = baseUrl;
    this.serviceName = serviceName;
    this.timeout = options.timeout || 5000;
    this.retries = options.retries || 3;
    this.retryDelay = options.retryDelay || 100;
  }

  async get(endpoint, config = {}) {
    return this._request('GET', endpoint, null, config);
  }

  async post(endpoint, data, config = {}) {
    return this._request('POST', endpoint, data, config);
  }

  async put(endpoint, data, config = {}) {
    return this._request('PUT', endpoint, data, config);
  }

  async delete(endpoint, config = {}) {
    return this._request('DELETE', endpoint, null, config);
  }

  async _request(method, endpoint, data, config = {}, attempt = 1) {
    try {
      const url = `${this.baseUrl}${endpoint}`;
      const axiosConfig = {
        timeout: this.timeout,
        ...config,
        headers: {
          'Content-Type': 'application/json',
          ...(config.correlationId && { 'X-Correlation-Id': config.correlationId }),
          ...config.headers
        }
      };

      let response;
      switch (method) {
        case 'GET':
          response = await axios.get(url, axiosConfig);
          break;
        case 'POST':
          response = await axios.post(url, data, axiosConfig);
          break;
        case 'PUT':
          response = await axios.put(url, data, axiosConfig);
          break;
        case 'DELETE':
          response = await axios.delete(url, axiosConfig);
          break;
        default:
          throw new Error(`Unsupported method: ${method}`);
      }

      return response.data;
    } catch (error) {
      const isRetryable = error.code === 'ECONNREFUSED' ||
                          error.code === 'ENOTFOUND' ||
                          error.code === 'ETIMEDOUT' ||
                          (error.response && error.response.status >= 500);

      if (isRetryable && attempt < this.retries) {
        await new Promise(resolve =>
          setTimeout(resolve, this.retryDelay * attempt)
        );
        return this._request(method, endpoint, data, config, attempt + 1);
      }

      const message = `${this.serviceName} request failed: ${error.message}`;
      const statusCode = error.response?.status || 503;

      throw new ServiceError(message, {
        service: this.serviceName,
        method,
        endpoint,
        statusCode,
        originalError: error.message
      });
    }
  }
}
