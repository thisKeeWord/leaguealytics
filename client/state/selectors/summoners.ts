import { SummonersData } from '../../../utils/interface';
import { RootState } from '../index';

export const selectSummonersIsFetching = (state: RootState): boolean => state.summoners.isFetching;
export const selectSummonersData = (state: RootState): SummonersData | null => state.summoners.summonersData;
export const selectSummonersError = (state: RootState): string | null => state.summoners.error;
