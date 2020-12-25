import { createSlice } from "@reduxjs/toolkit";

export interface MatchState {
  byId: any;
  ids: string[];
  isFetching: boolean;
  isMetaLoaded: boolean;
  error: string | null;
}

const initialState: MatchState = {
  byId: {},
  ids: [],
  isFetching: false,
  isMetaLoaded: false,
  error: null,
};

const matchSlice = createSlice({
  name: "matches",
  initialState,
  reducers: {
    setFetching(state, action): void {
      state.isFetching = action.payload.isFetching;
    },
    loadMatchSuccess(state, action): void {
      const { matchId, matches } = action.payload;
      state.byId[matchId].data = matches;
      state.error = null;
      state.isFetching = false;
    },
    loadMatchFailure(state, action): void {
      const { message } = action.payload;
      state.error = message;
      state.isFetching = false;
    },
    loadMatchList(state, action): void {
      const { matches } = action.payload;
      state.ids = matches.map((m: any) => m.matchId);
      state.byId = matches.reduce((acc: any, matchMeta: any) => {
        const { matchId } = matchMeta;
        acc[matchId] = {
          meta: {
            ...matchMeta,
          },
        };

        return acc;
      }, {});
      state.isFetching = false;
      state.isMetaLoaded = true;
    },
  },
});

export const {
  loadMatchSuccess,
  loadMatchFailure,
  loadMatchList,
  setFetching,
} = matchSlice.actions;
export default matchSlice.reducer;
