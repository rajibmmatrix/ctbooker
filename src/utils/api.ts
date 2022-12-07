import axios from 'axios';
import config from '~config';
import {URL} from '~constants';

const API = axios.create({
  baseURL: config.baseURL,
  responseType: 'json',
  timeout: 5000,
});

API.interceptors.response.use(
  function (response) {
    if (response.data?.success) {
      return response;
    } else {
      return Promise.reject(response);
    }
  },
  function (error) {
    return Promise.reject(error);
  },
);

export const setApiToken = (AUTH_TOKEN: string) => {
  return (API.defaults.headers.common.Authorization = `Bearer ${AUTH_TOKEN}`);
};

export const removeApiToken = () => {
  return (API.defaults.headers.common.Authorization = '');
};

//Auth API
export const getUser = () => API.get(URL.getUser);
export const signIn = (params: any) => API.post(URL.login, params);
export const signUp = (params: any) => API.put(URL.signup, params);
export const forgot = (params: any) => API.post(URL.forgot, params);

export default API;
