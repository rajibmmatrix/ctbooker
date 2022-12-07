import {CONFIG} from 'types';

const config = {
  name: 'CTBOOKER',
  policyURL: 'https://google.com',
  termsURL: 'https://google.com',
  androidURL: 'https://google.com', //app link for android
  iosURL: 'https://google.com', //app link for android
};

const development: CONFIG = {
  ...config,
  lang: 'en',
  mode: 'Development',
  version: '0.0.1',
  lang_version: '0.0.1',
  baseURL: 'https://www.betatesting.net/projects/ct-booker/public',
};

const production: CONFIG = {
  ...config,
  lang: 'fr',
  mode: 'Production',
  version: '0.0.1',
  lang_version: '0.0.1',
  baseURL: 'https://www.betatesting.net/projects/ct-booker/public',
};

export default __DEV__ ? development : production;
