import axios from 'axios';
import { AppThunk } from '../index';
import { loadMatchFailure, loadMatchSuccess, setMatchFetching } from '../reducers/match';

interface GetMatchTimelineProps {
  username: string;
  gameId: number;
}

export const getMatchTimeline = ({ username, gameId }: GetMatchTimelineProps): AppThunk => async (
  dispatch,
  getState,
): Promise<void> => {
  dispatch(setMatchFetching({ isFetching: true }));

  const formattedUsername = username.replace(/\s+/g, '').toLowerCase();

  if (!username) {
    return;
  }

  try {
    const matchData = await axios.get(`/api/${formattedUsername}/match/${gameId}`);

    if (matchData.data.error) {
      throw new Error(matchData.data);
    }
    dispatch(loadMatchSuccess({ matchData: matchData.data, matchId: gameId }));
  } catch (error) {
    dispatch(loadMatchFailure(error.message || 'An error has occurred'));
  } finally {
    dispatch(setMatchFetching({ isFetching: false }));
  }
};
