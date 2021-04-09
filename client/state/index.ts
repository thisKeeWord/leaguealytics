import { combineReducers } from 'redux';
import {
  Action, configureStore, Dispatch, ThunkAction,
} from '@reduxjs/toolkit';
import userReducer from './reducers/user';
import matchReducer from './reducers/match';
import patchReducer from './reducers/patch';

export const rootReducer = combineReducers({
  user: userReducer,
  match: matchReducer,
  patch: patchReducer,
});

const store = configureStore({ reducer: rootReducer });

export type RootState = ReturnType<typeof rootReducer>;
export type AppDispatch = typeof store.dispatch;

export * from './selectors';
// export * from "./actions";

export interface ThunkAPI {
  dispatch: AppDispatch;
  state: RootState;
}
export type AppThunk = ThunkAction<void, RootState, unknown, Action<string>>;
export interface ThunkContext {
  dispatch: Dispatch;
  getState: () => RootState;
}

export default store;
