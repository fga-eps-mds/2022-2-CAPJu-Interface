import axios from 'axios';

import authConfig from './config';

// TODO: replace with localhost:3334 after User-NEW merges
export const userURL = 'https://caju-service.herokuapp.com/';

const api = axios.create({
  baseURL: userURL,
  headers: authConfig().headers
});

export default api;
