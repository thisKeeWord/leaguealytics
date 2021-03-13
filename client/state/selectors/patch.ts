import { RootState } from '../index';

export const selectPatchIsFetching = (state: RootState): boolean => state.patch.isFetching;
export const selectPatchVersion = (state: RootState): boolean => state.patch.version;
export const selectPatchData = (state: RootState): string | null => state.patch.patchData;
export const selectPatchError = (state: RootState): string | null => state.patch.error;
