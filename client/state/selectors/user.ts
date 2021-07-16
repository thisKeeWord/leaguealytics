import { RootState } from '../index';
import { FirebaseUserDoc } from '../../../utils/interface';

export const selectUserFetching = (state: RootState): boolean => state.user.fetching;
export const selectUserError = (state: RootState): boolean | null => state.user.error;
export const selectUserDoc = (state: RootState): FirebaseUserDoc | null => state.user.doc;
