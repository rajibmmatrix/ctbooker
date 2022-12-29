import config from '~config';

export const baseURL = config.baseURL;

export const URL = {
  //Common
  lang: '/upload/json/lang-client.json',
  details: '/api/lang-json?type=client',

  //Auth
  getUser: '/api/v1/auth/get-user',
  login: '/api/v1/auth/login',
  signup: '/api/v1/auth/signup',
  forgot: '/api/v1/auth/forgot-password',
  edit_profile: '/api/v1/auth/edit-profile',
  edit_profilePic: '/api/v1/auth/profile-img',
  change_password: '/api/v1/auth/change-password',

  //Bookings
  add_booking: '/api/v1/booking/add-booking',
  get_bookings: '/api/v1/booking/get-bookings',
};
