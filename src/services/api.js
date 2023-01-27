import axios from 'axios';

import authConfig from './config.js';

export const baseURL = 'https://capju-service.herokuapp.com/';

const api = axios.create({
  baseURL: baseURL,
  headers: authConfig().headers
});

export default api;
