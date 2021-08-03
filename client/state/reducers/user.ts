import { createSlice } from '@reduxjs/toolkit';
import { FirebaseUserDoc } from '../../../utils/interface/index';

export interface UserState {
  fetching: boolean;
  doc: FirebaseUserDoc | null;
  error: boolean | null;
}

const initialState: UserState = {
  fetching: false,
  doc: null,
  error: null,
};

const user = createSlice({
  name: 'user',
  initialState,
  reducers: {
    setUser: (state, action): void => {
      state.doc = action.payload;
      state.error = null;
    },
    setFetching(state, action): void {
      state.fetching = action.payload.isFetching;
      state.error = null;
    },
    setUserError(state, action): void {
      const { message } = action.payload;
      state.error = message;
      state.fetching = false;
    },
  },
});

export const { setUser, setFetching, setUserError } = user.actions;
export default user.reducer;
