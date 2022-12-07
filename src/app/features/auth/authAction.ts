import {createAsyncThunk} from '@reduxjs/toolkit';
import Toast from 'react-native-simple-toast';
import {api, storage} from '~utils';
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
      await api.setApiToken(token);
      const {data} = await api.getUser();
      return {isLogin: true, user: data.data};
    } catch (error: any) {
      Toast.show(error.message);
      return thunkAPI.rejectWithValue(error.message);
    }
  },
);

//For get user info
export const getUser = createAsyncThunk('auth/getuser', async (_, thunkAPI) => {
  try {
    const {data} = await api.getUser();
    return data.data;
  } catch (error: any) {
    Toast.show(error.message);
    return thunkAPI.rejectWithValue(error.message);
  }
});

//For login user
export const login = createAsyncThunk(
  'auth/login',
  async (params: ILogin, thunkAPI) => {
    try {
      const {data} = await api.signIn(params);
      api.setApiToken(data.token);
      await storage.setToken(data.token);
      Toast.show(data.message);
      return data.data;
    } catch (error: any) {
      Toast.show(error.message);
      return thunkAPI.rejectWithValue(error.message);
    }
  },
);

//For forgot user
export const forgot = createAsyncThunk(
  'auth/forgot',
  async (params: IVerify, thunkAPI) => {
    try {
      const {data} = await api.forgot(params);
      Toast.show(data.message);
      return data.data;
    } catch (error: any) {
      Toast.show(error.message);
      return thunkAPI.rejectWithValue(error.message);
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
      Toast.show(data.message);
      return data.data;
    } catch (error: any) {
      Toast.show(error.message);
      return thunkAPI.rejectWithValue(error.message);
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
    Toast.show(error.message);
    return thunkAPI.rejectWithValue(error.message);
  }
});
