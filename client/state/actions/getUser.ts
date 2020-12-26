import axios from 'axios';
import { AppThunk } from '../index';
import { setFetching, setUser, setUserError } from '../reducers/user';

interface GetUserProps {
  username: string;
}

export const getUser = ({ username }: GetUserProps): AppThunk => async (
  dispatch,
  getState
): Promise<void> => {
  setFetching({ isFetching: true });

  const state = getState();

  const parsedName = state.user.doc?.name.replace(/\s+/g, '').toLowerCase();
  if (username === parsedName) {
    return;
  }

  try {
    const user = await axios.get(`/api/user/${username}`);
    dispatch(setUser(user));
  } catch (error) {
    dispatch(setUserError(error.message || 'An error has occurred'));
  } finally {
    dispatch(setFetching({ isFetching: false }));
  }
};
