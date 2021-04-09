import axios from 'axios';
import { AppThunk } from '../index';
import { loadMatchFailure, loadMatchSuccess, setMatchFetching } from '../reducers/match';

interface GetMatchTimelineProps {
  username: string;
  gameId: number;
}

export const getMatchTimeline = ({ username, gameId }: GetMatchTimelineProps): AppThunk => async (
  dispatch,
  // eslint-disable-next-line no-unused-vars
  getState,
): Promise<void> => {
  dispatch(setMatchFetching({ isFetching: true }));

  const formattedUsername = username.replace(/\s+/g, '').toLowerCase();

  try {
    const matchData = await axios.get(`/api/${formattedUsername}/match/${gameId}`);
    dispatch(loadMatchSuccess({ matchData: matchData.data, matchId: gameId }));
  } catch (error) {
    dispatch(loadMatchFailure(error.message || 'An error has occurred'));
  } finally {
    dispatch(setMatchFetching({ isFetching: false }));
  }
};
