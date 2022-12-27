import {
  TypedUseSelectorHook,
  useSelector as useAppSelector,
  useDispatch as useAppDispatch,
} from 'react-redux';
import {configureStore} from '@reduxjs/toolkit';
import loadingReducer from './features/loading/loadingSlice';
import authReducer from './features/auth/authSlice';
import bookingReducer from './features/booking/bookingSlice';

export const store = configureStore({
  reducer: {
    loading: loadingReducer,
    auth: authReducer,
    booking: bookingReducer,
  },
});

type AppDispatch = typeof store.dispatch;
type RootState = ReturnType<typeof store.getState>;

export const useDispatch = () => useAppDispatch<AppDispatch>();
export const useSelector: TypedUseSelectorHook<RootState> = useAppSelector;
