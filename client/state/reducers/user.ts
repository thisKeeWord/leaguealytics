import { createSlice } from '@reduxjs/toolkit';
import { FirebaseUserDoc } from '../../../utils/interface/index';

export interface UserState {
  fetching: false;
  doc: FirebaseUserDoc | null;
  error?: string;
}

const initialState: UserState = {
  fetching: false,
  doc: null,
};

const user = createSlice({
  name: 'user',
  initialState,
  reducers: {
    setUser: (state, action): void => {
      state.doc = action.payload;
    },
    setFetching(state, action): void {
      state.fetching = action.payload.isFetching;
    },
    setUserError(state, action): void {
      if (action.payload?.message) {
        state.error = action.payload.message;
      } else {
        state.error && delete state.error;
      }
    },
  },
});

export const { setUser, setFetching, setUserError } = user.actions;
export default user.reducer;
