import { waitFor } from '@testing-library/react';
import axios from 'axios';
import faker from 'faker';
import { loadMatchFailure, loadMatchSuccess } from '../reducers/match';
import { getMatchTimeline } from './getMatchTimeline';

jest.mock('axios');
jest.mock('../../../api');

const username = faker.random.alphaNumeric();
const gameId = faker.datatype.number();

describe('getUser', () => {
  it('calls "axios.get" api route', async () => {
    const dispatch = jest.fn();
    const getState = jest.fn();
    const spy = jest.spyOn(axios, 'get');

    getMatchTimeline({ username, gameId })(dispatch, getState, null);

    expect(spy).toHaveBeenCalled();
  });

  it('calls dispatch with loadMatchSuccess if api call was successful', async () => {
    const dispatch = jest.fn();
    const getState = jest.fn();

    const responseData = {
      data: {},
    };

    jest.spyOn(axios, 'get').mockImplementationOnce(() => Promise.resolve(responseData));

    getMatchTimeline({ username, gameId })(dispatch, getState, null);

    await waitFor(() => expect(dispatch).toHaveBeenCalledWith(
      loadMatchSuccess({ matchData: responseData.data, matchId: gameId }),
    ));
  });

  it('calls dispatch with loadMatchFailure if api call was unsuccessful', async () => {
    const dispatch = jest.fn();
    const getState = jest.fn();

    // eslint-disable-next-line prefer-promise-reject-errors
    jest.spyOn(axios, 'get').mockImplementationOnce(() => Promise.reject({ data: {} }));

    getMatchTimeline({ username, gameId })(dispatch, getState, null);

    await waitFor(() => expect(dispatch).toHaveBeenCalledWith(loadMatchFailure('An error has occurred')));
  });
});
