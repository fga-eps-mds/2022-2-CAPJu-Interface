import axios from 'axios';

import authConfig from './config';

export const userURL = 'https://capju-user.herokuapp.com/';

const api = axios.create({
  baseURL: userURL,
  headers: authConfig().headers
});

export default api;
