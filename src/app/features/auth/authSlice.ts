import {createSlice} from '@reduxjs/toolkit';
import type {PayloadAction} from '@reduxjs/toolkit';
import {checkLogin, getUser, login, logout, signup, forgot} from './authAction';

export interface IUser {
  name?: string;
  email?: string;
  phone_no: string;
  image?: string;
  address?: [];
  date_of_birth?: string;
  gender?: string;
  //for login
  otp?: string;
  new_user?: boolean;
}

export interface AuthState {
  isLoggedin: boolean;
  user: IUser | null;
  error: string | null;
}

const initialState: AuthState = {
  isLoggedin: false,
  user: null,
  error: null,
};

export const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {},
  extraReducers: builder => {
    builder.addCase(checkLogin.fulfilled, (state: AuthState, action: any) => {
      state.isLoggedin = action.payload?.isLogin;
      state.user = action.payload?.user;
      state.error = null;
    });
    builder.addCase(
      getUser.fulfilled,
      (state: AuthState, action: PayloadAction<IUser>) => {
        state.user = action.payload;
        state.error = null;
      },
    );
    builder.addCase(
      login.fulfilled,
      (state: AuthState, action: PayloadAction<IUser>) => {
        state.isLoggedin = true;
        state.user = action.payload;
        state.error = null;
      },
    );
    builder.addCase(forgot.fulfilled, (state: AuthState, action: any) => {
      state.user = action.payload?.profile;
      state.error = null;
    });
    builder.addCase(
      signup.fulfilled,
      (state: AuthState, action: PayloadAction<IUser>) => {
        state.isLoggedin = true;
        state.user = action.payload;
        state.error = null;
      },
    );
    builder.addCase(
      logout.fulfilled,
      (state: AuthState, action: PayloadAction<boolean>) => {
        state.isLoggedin = action.payload;
        state.user = null;
        state.error = null;
      },
    );
  },
});

export default authSlice.reducer;
