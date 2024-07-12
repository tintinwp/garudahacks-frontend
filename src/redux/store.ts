import { configureStore } from '@reduxjs/toolkit';
import { combineReducers } from 'redux';
import sliceReducer, { SliceState } from './slice';


export type StoreState = {
  slice: SliceState; 
};

const rootReducer = combineReducers({
  slice: sliceReducer
});

const store = configureStore({
  reducer: rootReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false,
    }),
});

export default store;
