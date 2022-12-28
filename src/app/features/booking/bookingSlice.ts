import {createSlice} from '@reduxjs/toolkit';
import type {PayloadAction} from '@reduxjs/toolkit';
import {addBooking, getBookings} from './bookingAction';
import {ICBooking} from 'types';

export interface IBooking extends ICBooking {
  id: number;
}

export interface BookingState {
  bookings: IBooking[];
  error: string | null;
}

const initialState: BookingState = {
  bookings: [],
  error: null,
};

export const bookingSlice = createSlice({
  name: 'booking',
  initialState,
  reducers: {},
  extraReducers: builder => {
    builder.addCase(
      getBookings.fulfilled,
      (state: BookingState, action: PayloadAction<IBooking[]>) => {
        state.bookings = action.payload;
        state.error = null;
      },
    );
    builder.addCase(
      addBooking.fulfilled,
      (state: BookingState, action: PayloadAction<IBooking>) => {
        state.bookings.push(action.payload);
        state.error = null;
      },
    );
  },
});

export default bookingSlice.reducer;
