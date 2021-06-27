import { combineReducers } from 'redux';
import {
  Action, configureStore, Dispatch, ThunkAction,
} from '@reduxjs/toolkit';
import matchReducer from './reducers/match';
import patchReducer from './reducers/patch';
import summonersReducer from './reducers/summoners';
import userReducer from './reducers/user';

export const rootReducer = combineReducers({
  match: matchReducer,
  summoners: summonersReducer,
  patch: patchReducer,
  user: userReducer,
});

const store = configureStore({ reducer: rootReducer });

export type RootState = ReturnType<typeof rootReducer>;
export type AppDispatch = typeof store.dispatch;

export * from './selectors';

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
