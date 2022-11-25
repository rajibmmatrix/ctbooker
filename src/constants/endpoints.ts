import config from '~config';

export const baseURL = config.baseURL;

export const URL = {
  //Auth
  getUser: '/auth/customer',
  login: '/auth/login',
  signup: '/auth/signup',
  forgot: '/auth/forgot',
};
