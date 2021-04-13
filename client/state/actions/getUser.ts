import axios from 'axios';
import { AppThunk } from '../index';
import { loadMatchList } from '../reducers/match';
import { loadPatchSuccess } from '../reducers/patch';
import { setFetching, setUser, setUserError } from '../reducers/user';

interface GetUserProps {
  username: string;
}

export const getUser = ({ username }: GetUserProps): AppThunk => async (
  dispatch,
  getState,
): Promise<void> => {
  dispatch(setFetching({ isFetching: true }));

  try {
    const patchData = await axios.get('/api/patch');
    if (patchData.data.error) {
      throw new Error(patchData.data);
    }
    dispatch(loadPatchSuccess(patchData.data));

    const user = await axios.get(`/api/users/${username}`);
    if (user.data.error) {
      throw new Error(user.data);
    }
    dispatch(setUser(user.data));

    const matchList = await axios.get(`/api/user/${user.data.accountId}`);
    if (matchList.data.error) {
      throw new Error(matchList.data);
    }
    dispatch(loadMatchList({ ...user.data.matches, ...matchList.data }));
  } catch (error) {
    dispatch(setUserError(error.message || 'An error has occurred'));
  } finally {
    dispatch(setFetching({ isFetching: false }));
  }
};
