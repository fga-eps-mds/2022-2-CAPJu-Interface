import axios from 'axios';

import authConfig from './config';

export const userURL = process.env.REACT_APP_DEV
  ? 'https://capju-user.herokuapp.com/'
  : 'https://localhost:3334';

const api = axios.create({
  baseURL: userURL,
  headers: authConfig().headers
});

export default api;
