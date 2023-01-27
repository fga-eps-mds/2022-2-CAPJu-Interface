import axios from 'axios';

import authConfig from './config.js';

export const baseURL = 'https://caju-service.herokuapp.com/';

const api = axios.create({
  baseURL: baseURL,
  headers: authConfig().headers
});

export default api;
