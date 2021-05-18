import faker from 'faker';
import api from '../api';
import { generateAxiosResponseObject } from '../utils/helper';
import { matchOverviewData } from './constants';
import { getUsersInfo } from './getUsersInfo';

jest.mock('../api');
const req = {
  params: {
    username: faker.random.word(),
  },
};
const res = {
  send: jest.fn(),
};

describe('getUsersInfo', () => {
  it('calls firebase users collection api route', async () => {
    const spy = jest.spyOn(api.users, 'doc');
    await getUsersInfo(req, res);

    expect(spy).toHaveBeenCalledWith(req.params.username);
  });

  it('calls "riotAPI.users" api route', async () => {
    const spy = jest.spyOn(api.riotAPI.users, 'get');
    await getUsersInfo(req, res);

    expect(spy).toHaveBeenCalledWith(req.params.username);
  });

  it('calls "riotAPI.match.overview" api route', async () => {
    const basicSuccessResponse = generateAxiosResponseObject(
      {
        matches: [
          {
            season: 13,
            platformId: 'NA1',
            gameId: 3833657566,
            championImg: 'Anivia.png',
            champion: 34,
            role: 'DUO_SUPPORT',
            timestamp: 1616225321603,
            queue: 450,
            lane: 'MID',
          },
        ],
      },
      { status: 200 },
    );
    jest.spyOn(api.riotAPI.match.overview, 'get').mockImplementationOnce((): any => generateAxiosResponseObject(matchOverviewData, { status: 200 }));
    const spy = jest.spyOn(api.riotAPI.matchList, 'get');
    spy.mockImplementationOnce((): any => basicSuccessResponse);
    await getUsersInfo(req, res);

    expect(spy).toHaveBeenCalled();
  });
});
