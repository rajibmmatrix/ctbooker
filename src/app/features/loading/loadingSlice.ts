import {createSlice} from '@reduxjs/toolkit';
import type {PayloadAction} from '@reduxjs/toolkit';

export interface LoadingState {
  isLoading: boolean;
  error: string | null;
}

const initialState: LoadingState = {
  isLoading: false,
  error: null,
};

export const loadingSlice = createSlice({
  name: 'loading',
  initialState,
  reducers: {
    startLoading: state => {
      state.isLoading = true;
    },
    stopLoading: state => {
      state.isLoading = false;
    },
    loading: (state, action: PayloadAction<boolean>) => {
      state.isLoading = action.payload;
    },
  },
});

export const {startLoading, stopLoading, loading} = loadingSlice.actions;

export default loadingSlice.reducer;
