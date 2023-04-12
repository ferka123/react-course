import { configureStore, combineReducers } from '@reduxjs/toolkit';
import { TypedUseSelectorHook, useDispatch, useSelector } from 'react-redux';
import searchReducer from './features/searchSlice';
import formReducer from './features/formSlice';
import { api } from './api';
import type { PreloadedState } from '@reduxjs/toolkit';

const rootReducer = combineReducers({
  [api.reducerPath]: api.reducer,
  searchState: searchReducer,
  formState: formReducer,
});

export type InitialState = PreloadedState<ReturnType<typeof rootReducer>>;

export const setupStore = (preloadedState: InitialState = {}) =>
  configureStore({
    reducer: rootReducer,
    middleware: (getDefaultMiddleware) => getDefaultMiddleware({}).concat([api.middleware]),
    preloadedState,
  });

export const store = setupStore();

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
export const useAppDispatch = () => useDispatch<AppDispatch>();
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;
