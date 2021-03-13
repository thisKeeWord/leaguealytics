import { createSlice } from '@reduxjs/toolkit';

export interface PatchState {
  version: any;
  patchData: any;
  isFetching: boolean;
  error: string | null;
}

const initialState: PatchState = {
  version: null,
  patchData: null,
  isFetching: false,
  error: null,
};

const patchSlice = createSlice({
  name: 'patch',
  initialState,
  reducers: {
    setFetching(state, action): void {
      state.isFetching = action.payload.isFetching;
    },
    loadPatchSuccess(state, action): void {
      const { version, patchData } = action.payload;
      state.version = version;
      state.patchData = patchData;
      state.error = null;
      state.isFetching = false;
    },
    loadPatchFailure(state, action): void {
      const { message } = action.payload;
      state.error = message;
      state.isFetching = false;
    },
  },
});

export const { loadPatchSuccess, loadPatchFailure, setFetching } = patchSlice.actions;
export default patchSlice.reducer;
