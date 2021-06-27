import { createSlice } from '@reduxjs/toolkit';
import { PatchData } from '../../../utils/interface';

export interface PatchState {
  patchData: PatchData | null;
  isFetching: boolean;
  error: string | null;
}

const initialState: PatchState = {
  patchData: null,
  isFetching: false,
  error: null,
};

const patchSlice = createSlice({
  name: 'patch',
  initialState,
  reducers: {
    setPatchFetching(state, action): void {
      state.isFetching = action.payload.isFetching;
    },
    loadPatchSuccess(state, action): void {
      state.patchData = action.payload;
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

export const { loadPatchSuccess, loadPatchFailure, setPatchFetching } = patchSlice.actions;
export default patchSlice.reducer;
