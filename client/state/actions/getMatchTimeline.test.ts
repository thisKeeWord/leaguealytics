import { waitFor } from '@testing-library/react';
import axios from 'axios';
import faker from 'faker';
import { loadMatchFailure, loadMatchSuccess } from '../reducers/match';
import { getMatchTimeline } from './getMatchTimeline';

jest.mock('axios');
jest.mock('../../../api');

const username = faker.random.alphaNumeric();
const matchId = faker.random.alphaNumeric();
const stateData = {
  match: {
    byId: { [matchId]: { data: {} } }, ids: [matchId], isFetching: false, isMetaLoaded: true, error: null,
  },
  summoners: {
    summonersData: {
      type: 'summoners',
      data: {},
      version: faker.random.alphaNumeric(),
    },
    isFetching: false,
    error: null,
  },
  patch: {
    patchData: {
      version: faker.random.alphaNumeric(),
      data: {},
    },
    isFetching: false,
    error: null,
  },
  user: {
    fetching: false,
    doc: {
      id: faker.random.alphaNumeric(),
      accountId: faker.random.alphaNumeric(),
      puuid: faker.random.alphaNumeric(),
      name: faker.random.alphaNumeric(),
      profileIconId: faker.datatype.number(),
      revisionDate: faker.datatype.number(),
      summonerLevel: faker.datatype.number(),
    },
  },
};

describe('getMatchTimeline', () => {
  it('calls "axios.get" api route', async () => {
    const dispatch = jest.fn();
    const getState = jest.fn(() => stateData);
    const spy = jest.spyOn(axios, 'get');

    getMatchTimeline({ username, matchId })(dispatch, getState, null);

    await waitFor(() => expect(spy).toHaveBeenCalled());
  });

  it('calls dispatch with loadMatchSuccess if api call was successful', async () => {
    const dispatch = jest.fn();
    const getState = jest.fn(() => stateData);

    const responseData = {
      data: {},
    };

    jest.spyOn(axios, 'get').mockImplementationOnce(() => Promise.resolve(responseData));

    getMatchTimeline({ username, matchId })(dispatch, getState, null);

    await waitFor(() => expect(dispatch).toHaveBeenCalledWith(
      loadMatchSuccess({ matchData: responseData.data, matchId }),
    ));
  });

  it('calls dispatch with loadMatchFailure if api call was unsuccessful', async () => {
    const dispatch = jest.fn();
    const getState = jest.fn(() => stateData);

    // eslint-disable-next-line prefer-promise-reject-errors
    jest.spyOn(axios, 'get').mockImplementationOnce(() => Promise.reject({ data: {} }));

    getMatchTimeline({ username, matchId })(dispatch, getState, null);

    await waitFor(() => expect(dispatch).toHaveBeenCalledWith(loadMatchFailure('An error has occurred')));
  });
});
