import axios from 'axios';

import authConfig from './config';

export const userURL = process.env.REACT_APP_DEV
  ? 'http://localhost:3334'
  : 'https://capju-user.herokuapp.com/';

const api = axios.create({
  baseURL: userURL,
  headers: authConfig().headers
});

export default api;
