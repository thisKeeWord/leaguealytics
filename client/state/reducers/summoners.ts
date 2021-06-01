import { createSlice } from '@reduxjs/toolkit';

export interface SummonersState {
  summonersData: Record<any, any> | null;
  isFetching: boolean;
  error: string | null;
}

const initialState: SummonersState = {
  summonersData: null,
  isFetching: false,
  error: null,
};

const summonersSlice = createSlice({
  name: 'summoners',
  initialState,
  reducers: {
    setSummonersFetching(state, action): void {
      state.isFetching = action.payload.isFetching;
    },
    loadSummonersSuccess(state, action): void {
      state.summonersData = action.payload.summonersData;
      state.error = null;
      state.isFetching = false;
    },
    loadSummonersFailure(state, action): void {
      const { message } = action.payload;
      state.error = message;
      state.isFetching = false;
    },
  },
});

export const { loadSummonersSuccess, loadSummonersFailure, setSummonersFetching } = summonersSlice.actions;
export default summonersSlice.reducer;
