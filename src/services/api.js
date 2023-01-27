import axios from 'axios';

import authConfig from './config.js';

export const baseURL = process.env.REACT_APP_DEV
  ? 'http://localhost:3333'
  : 'https://capju-service.herokuapp.com/';
const api = axios.create({
  baseURL: baseURL,
  headers: authConfig().headers
});

export default api;
