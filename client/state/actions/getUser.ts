import axios from 'axios';
import { AppThunk } from '../index';
import { loadMatchList } from '../reducers/match';
import { setFetching, setUser, setUserError } from '../reducers/user';

interface GetUserProps {
  username: string;
}

export const getUser = ({ username }: GetUserProps): AppThunk => async (
  dispatch,
  getState
): Promise<void> => {
  setFetching({ isFetching: true });

  try {
    const user = await axios.get(`/api/users/${username}`);
    dispatch(setUser(user.data));

    const matchList = await axios.get(`/api/user/${user.data.accountId}`);
    dispatch(loadMatchList({ matchList: matchList.data }));
  } catch (error) {
    dispatch(setUserError(error.message || 'An error has occurred'));
  } finally {
    dispatch(setFetching({ isFetching: false }));
  }
};
