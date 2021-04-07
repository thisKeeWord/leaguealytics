import faker from 'faker';
import api from '../api';
import { generateAxiosResponseObject } from '../utils/helper';
import { getUserMatches } from './getUserMatches';

jest.mock('../api');
const req = {
  params: {
    userId: faker.datatype.number(),
  },
};
const res = {
  send: jest.fn(),
};

describe('getUserMatches', () => {
  it('calls firebase users collection api route', async () => {
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
      { status: 200 }
    );

    jest
      .spyOn(api.riotAPI.matchList, 'get')
      .mockImplementationOnce((): any => basicSuccessResponse);

    const spy = jest.spyOn(api.patchData, 'doc');
    await getUserMatches(req, res);

    expect(spy).toHaveBeenCalled();
  });

  it('calls "riotAPI.matchList" api route', async () => {
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
      { status: 200 }
    );
    const spy = jest.spyOn(api.riotAPI.matchList, 'get');
    spy.mockImplementationOnce((): any => basicSuccessResponse);
    await getUserMatches(req, res);

    expect(spy).toHaveBeenCalledWith(req.params.userId);
  });
});
