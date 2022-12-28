import {createAsyncThunk} from '@reduxjs/toolkit';
import {api, showToaster} from '~utils';
import {ICBooking} from 'types';

//For Get all bookings
export const getBookings = createAsyncThunk(
  'booking/bookings',
  async (_, thunkAPI) => {
    try {
      const {data}: any = await api.getBookings();
      return data?.bookings;
    } catch (error: any) {
      showToaster(error, 'error');
      return thunkAPI.rejectWithValue(error);
    }
  },
);

//For Create booking
export const addBooking = createAsyncThunk(
  'booking/create',
  async (params: ICBooking, thunkAPI) => {
    try {
      const {data, message}: any = await api.addBooking(params);
      showToaster(message, 'success');
      return data?.booking;
    } catch (error: any) {
      showToaster(error, 'error');
      return thunkAPI.rejectWithValue(error);
    }
  },
);
