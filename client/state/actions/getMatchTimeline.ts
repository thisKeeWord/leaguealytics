import axios from 'axios';
import { AppThunk } from '../index';
import { loadMatchFailure, loadMatchSuccess, setMatchFetching } from '../reducers/match';

interface GetMatchTimelineProps {
  username: string;
  matchId: string;
}

export const getMatchTimeline = ({ username, matchId }: GetMatchTimelineProps): AppThunk => async (dispatch, getState): Promise<void> => {
  const state = getState();
  const match = state.match;
  dispatch(setMatchFetching({ isFetching: true }));

  const formattedUsername = username.replace(/\s+/g, '').toLowerCase();

  if (!username || match.byId[matchId].data.byTimeframe) {
    return;
  }

  try {
    const matchData = await axios.get(`/api/${formattedUsername}/match/${matchId}`);

    if (matchData.data.error) {
      throw new Error(matchData.data);
    }

    dispatch(loadMatchSuccess({ matchData: matchData.data, matchId }));
  } catch (error) {
    dispatch(loadMatchFailure(error.message || 'An error has occurred'));
  } finally {
    dispatch(setMatchFetching({ isFetching: false }));
  }
};
