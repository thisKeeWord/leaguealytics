import faker from 'faker';
import api from '../api';
import { generateAxiosResponseObject } from '../utils/helper';
import { getUserMatches } from './getUserMatches';
import { matchOverviewData } from './constants';

jest.mock('../api');
const req = {
  params: {
    userId: faker.datatype.number(),
  },
};
const res = {
  send: jest.fn(),
  status: jest.fn(() => res),
};

describe('getUserMatches', () => {
  it('calls firebase users collection api route', async () => {
    jest.spyOn(api.riotAPI.match.overview, 'get')
      .mockImplementationOnce((): any => generateAxiosResponseObject(matchOverviewData, { status: 200 }));
    const spy = jest.spyOn(api.users, 'doc');
    await getUserMatches(req, res);

    expect(spy).toHaveBeenCalled();
  });

  it('calls "riotAPI.match.overview" api route', async () => {
    const spy = jest.spyOn(api.riotAPI.match.overview, 'get');
    spy.mockImplementationOnce((): any => generateAxiosResponseObject(matchOverviewData, { status: 200 }));
    await getUserMatches(req, res);

    expect(spy).toHaveBeenCalled();
  });
});
