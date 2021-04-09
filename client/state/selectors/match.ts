import { createSelector } from '@reduxjs/toolkit';
import { RootState } from '../index';

export const selectMatchesByID = (state: RootState): typeof state.match.byId => state.match.byId;
export const selectMatchIDs = (state: RootState): typeof state.match.ids => state.match.ids;
export const selectMatchesIsFetching = (state: RootState): boolean => state.match.isFetching;
export const selectMetaLoaded = (state: RootState): boolean => state.match.isMetaLoaded;
export const selectMatchesError = (state: RootState): string | null => state.match.error;
export const selectMatchesList = createSelector(
  [selectMatchesByID, selectMatchIDs],
  (byId, ids) => ids.map((id) => byId[id]),
);
