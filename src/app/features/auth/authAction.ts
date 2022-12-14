import {createAsyncThunk} from '@reduxjs/toolkit';
import {api, showToaster, storage} from '~utils';
import {ILogin, ISignup, IVerify} from 'types';

//For Check user login or not
export const checkLogin = createAsyncThunk(
  'auth/checkLogin',
  async (_, thunkAPI) => {
    try {
      const token = await storage.getToken();
      if (!token) {
        return {isLogin: false, user: null};
      }
      api.setApiToken(token);
      const {data} = await api.getUser();
      return {isLogin: true, user: data.data};
    } catch (error: any) {
      showToaster(error, 'error');
      return thunkAPI.rejectWithValue(error);
    }
  },
);

//For get user info
export const getUser = createAsyncThunk('auth/getuser', async (_, thunkAPI) => {
  try {
    const {data} = await api.getUser();
    return data.data;
  } catch (error: any) {
    showToaster(error, 'error');
    return thunkAPI.rejectWithValue(error);
  }
});

//For login user
export const login = createAsyncThunk(
  'auth/login',
  async (params: ILogin, thunkAPI) => {
    try {
      const {data, message}: any = await api.signIn(params);
      console.log('Data: ', data);
      api.setApiToken(data.access_token);
      await storage.setToken(data.access_token);
      showToaster(message, 'success');
      return data.user_data;
    } catch (error: any) {
      showToaster(error, 'error');
      return thunkAPI.rejectWithValue(error);
    }
  },
);

//For forgot user
export const forgot = createAsyncThunk(
  'auth/forgot',
  async (params: IVerify, thunkAPI) => {
    try {
      const {data} = await api.forgot(params);
      showToaster(data.message, 'success');
      return data.data;
    } catch (error: any) {
      showToaster(error, 'error');
      return thunkAPI.rejectWithValue(error);
    }
  },
);

//For signup user
export const signup = createAsyncThunk(
  'auth/signup',
  async (params: ISignup, thunkAPI) => {
    try {
      const {data} = await api.signUp(params);
      api.setApiToken(data.token);
      await storage.setToken(data.token);
      showToaster(data.message, 'success');
      return data.data;
    } catch (error: any) {
      showToaster(error, 'error');
      return thunkAPI.rejectWithValue(error);
    }
  },
);

//For Logout user
export const logout = createAsyncThunk('auth/logout', async (_, thunkAPI) => {
  try {
    api.removeApiToken();
    await storage.deleteToken();
    return false;
  } catch (error: any) {
    showToaster(error, 'error');
    return thunkAPI.rejectWithValue(error);
  }
});
