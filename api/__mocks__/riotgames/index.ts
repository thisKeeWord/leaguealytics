import { generateAxiosResponseObject } from '../../../utils/helper';
import { RiotAPI } from '../../riotgames';

const riotAPI: RiotAPI = {
  users: {
    get: jest.fn(async () =>
      generateAxiosResponseObject({
        data: {
          accountId: '123',
          id: '234',
          summonerLevel: 271,
          name: 'TEEHEE92',
          profileIconId: 123,
          puuid: '123',
          revisionDate: 1616226785000,
          matches: [
            {
              championImg: 'Anivia.png',
              role: 'DUO_SUPPORT',
              platformId: 'NA1',
              queue: 450,
              lane: 'MID',
              gameId: 3833657566,
              timestamp: 1616225321603,
              season: 13,
              champion: 34,
            },
          ],
        },
      })
    ),
  },
  matchList: {
    get: jest.fn(),
  },
  patch: {
    version: {
      get: jest.fn(),
    },
    data: {
      get: jest.fn(),
    },
  },
  match: {
    overview: {
      get: jest.fn(),
    },
    timeline: {
      get: jest.fn(),
    },
  },
};

export default riotAPI;
