import axios from 'axios';

import authConfig from './config';

// TODO: replace with localhost:3334 after User-NEW merges
export const userURL = process.env.REACT_APP_DEV
  ? 'https://localhost:3333'
  : 'https://capju-user.herokuapp.com/';

const api = axios.create({
  baseURL: userURL,
  headers: authConfig().headers
});

export default api;
