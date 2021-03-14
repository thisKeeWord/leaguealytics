import { RootState } from '../index';

export const selectPatchIsFetching = (state: RootState): boolean => state.patch.isFetching;
export const selectPatchData = (state: RootState): Record<any, any> | null => state.patch.patchData;
export const selectPatchError = (state: RootState): string | null => state.patch.error;
