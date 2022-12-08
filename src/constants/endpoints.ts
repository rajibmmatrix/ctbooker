import config from '~config';

export const baseURL = config.baseURL;

export const URL = {
  //Common
  lang: '/upload/json/lang-client.json',
  details: '/api/lang-json?type=client',

  //Auth
  getUser: '/auth/customer',
  login: '/api/v1/auth/login',
  signup: '/api/v1/auth/signup',
  forgot: '/api/v1/auth/forgot-password',
};
