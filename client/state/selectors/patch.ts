import { PatchData } from '../../../utils/interface';
import { RootState } from '../index';

export const selectPatchIsFetching = (state: RootState): boolean => state.patch.isFetching;
export const selectPatchData = (state: RootState): PatchData | null => state.patch.patchData;
export const selectPatchError = (state: RootState): string | null => state.patch.error;
