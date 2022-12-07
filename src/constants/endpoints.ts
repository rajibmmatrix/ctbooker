import config from '~config';

export const baseURL = config.baseURL;

export const URL = {
  //Common
  lang: '/upload/json/lang-client.json',
  details: '/api/lang-json?type=client',

  //Auth
  getUser: '/auth/customer',
  login: '/auth/login',
  signup: '/auth/signup',
  forgot: '/auth/forgot',
};
