import axios from 'axios';
import config from '~config';
import {URL} from '~constants';

const API = axios.create({
  baseURL: config.baseURL,
  responseType: 'json',
  headers: {
    'Content-Type': 'application/json',
  },
});

API.interceptors.response.use(
  function (response) {
    console.log('Response: ' + JSON.stringify(response));
    if (response.data?.status && response.data?.status !== 0) {
      return response;
    } else {
      const message = response.data?.message;
      return Promise.reject(message);
    }
  },
  function (error) {
    console.log('error: ' + error);
    return Promise.reject(error);
  },
);

export const setApiToken = (AUTH_TOKEN: string) => {
  return (API.defaults.headers.common.Authorization = `Bearer ${AUTH_TOKEN}`);
};

export const removeApiToken = () => {
  return (API.defaults.headers.common.Authorization = '');
};

//For Common API
export const getDetails = () => axios.get(config.baseURL + URL.details);
export const getLanguage = () => axios.get(config.baseURL + URL.lang);

//Auth API
export const getUser = () => API.get(URL.getUser);
export const signIn = (params: any) => API.post(URL.login, params);
export const signUp = (params: any) => API.put(URL.signup, params);
export const forgot = (params: any) => API.post(URL.forgot, params);

export default API;
