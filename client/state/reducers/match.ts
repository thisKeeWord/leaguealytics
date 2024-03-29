import { createSlice } from '@reduxjs/toolkit';
import { MatchesById } from '../../../utils/interface';

export interface MatchState {
  byId: MatchesById;
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
  name: 'matches',
  initialState,
  reducers: {
    setMatchFetching(state, action): void {
      state.isFetching = action.payload.isFetching;
      state.error = null;
    },
    loadMatchSuccess(state, action): void {
      const { matchId, matchData } = action.payload;
      state.byId[matchId].data = matchData;
      state.error = null;
      state.isFetching = false;
    },
    loadMatchFailure(state, action): void {
      const { message } = action.payload;
      state.error = message;
      state.isFetching = false;
    },
    loadMatchList(state, action): void {
      const { matches, matchListData } = action.payload;
      state.ids = matches.map((m: any) => m.matchId);
      state.byId = matches.reduce((acc: any, matchMeta: any) => {
        const { matchId } = matchMeta;
        acc[matchId] = {
          meta: {
            ...matchMeta,
          },
          data: {
            ...matchListData.find((match) => match.matchId === matchId),
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
  loadMatchSuccess, loadMatchFailure, loadMatchList, setMatchFetching,
} = matchSlice.actions;
export default matchSlice.reducer;
