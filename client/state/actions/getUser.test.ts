import { waitFor } from '@testing-library/react';
import axios from 'axios';
import faker from 'faker';
import { loadMatchList } from '../reducers/match';
import { setUserError } from '../reducers/user';
import { getUser } from './getUser';

jest.mock('axios');
jest.mock('../../../api');

const username = faker.random.alphaNumeric();

describe('getUser', () => {
  it('calls "axios.get" api route', async () => {
    const dispatch = jest.fn();
    const getState = jest.fn();
    const spy = jest.spyOn(axios, 'get');

    getUser({ username })(dispatch, getState, null);

    expect(spy).toHaveBeenCalled();
  });

  it('calls dispatch with loadMatchList if api call was successful', async () => {
    const dispatch = jest.fn();
    const getState = jest.fn();

    const responseData = {
      data: {},
    };

    jest.spyOn(axios, 'get').mockImplementation(() => Promise.resolve(responseData));

    getUser({ username })(dispatch, getState, null);

    await waitFor(() => expect(dispatch).toHaveBeenCalledWith(loadMatchList(responseData.data)));
  });

  it('calls dispatch with setUserError if api call was unsuccessful', async () => {
    const dispatch = jest.fn();
    const getState = jest.fn();

    jest.spyOn(axios, 'get').mockImplementationOnce(() => Promise.reject({ data: [] }));

    getUser({ username })(dispatch, getState, null);

    await waitFor(() =>
      expect(dispatch).toHaveBeenCalledWith(setUserError('An error has occurred'))
    );
  });
});
