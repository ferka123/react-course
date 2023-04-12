import { configureStore } from '@reduxjs/toolkit';
import { TypedUseSelectorHook, useDispatch, useSelector } from 'react-redux';
import searchReducer from './features/searchSlice';
import formReducer from './features/formSlice';

export const store = configureStore({
  reducer: {
    searchState: searchReducer,
    formState: formReducer,
  },
  middleware: (getDefaultMiddleware) => getDefaultMiddleware({}),
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
export const useAppDispatch = () => useDispatch<AppDispatch>();
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;
