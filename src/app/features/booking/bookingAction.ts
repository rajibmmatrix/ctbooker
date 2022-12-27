import {createAsyncThunk} from '@reduxjs/toolkit';
import {api, showToaster} from '~utils';
import {ICBooking} from 'types';

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
