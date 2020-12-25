import { createSlice } from "@reduxjs/toolkit";
import { FirebaseUserDoc } from "../../../utils/index";

export interface UserState {
  fetching: false;
  doc: FirebaseUserDoc | null;
}

const initialState: UserState = {
  fetching: false,
  doc: null,
};

const user = createSlice({
  name: "user",
  initialState,
  reducers: {
    setUser: (state, action): void => {
      state.doc = action.payload;
    },
    setFetching(state, action): void {
      state.fetching = action.payload.isFetching;
    },
  },
});

export const { setUser, setFetching } = user.actions;
export default user.reducer;
