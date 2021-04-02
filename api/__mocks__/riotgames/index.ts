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
      get: jest.fn(async () => generateAxiosResponseObject({ data: ['0'] }, { status: 200 })),
    },
    data: {
      get: jest.fn(async () =>
        generateAxiosResponseObject({
          data: {
            type: 'champion',
            format: 'standAloneComplex',
            version: '11.5.1',
            data: {
              Aatrox: {
                version: '11.5.1',
                id: 'Aatrox',
                key: '266',
                name: 'Aatrox',
                title: 'the Darkin Blade',
                blurb:
                  'Once honored defenders of Shurima against the Void, Aatrox and his brethren would eventually become an even greater threat to Runeterra, and were defeated only by cunning mortal sorcery. But after centuries of imprisonment, Aatrox was the first to find...',
                info: {
                  attack: 8,
                  defense: 4,
                  magic: 3,
                  difficulty: 4,
                },
                image: {
                  full: 'Aatrox.png',
                  sprite: 'champion0.png',
                  group: 'champion',
                  x: 0,
                  y: 0,
                  w: 48,
                  h: 48,
                },
                tags: ['Fighter', 'Tank'],
                partype: 'Blood Well',
                stats: {
                  hp: 580,
                  hpperlevel: 90,
                  mp: 0,
                  mpperlevel: 0,
                  movespeed: 345,
                  armor: 38,
                  armorperlevel: 3.25,
                  spellblock: 32,
                  spellblockperlevel: 1.25,
                  attackrange: 175,
                  hpregen: 3,
                  hpregenperlevel: 1,
                  mpregen: 0,
                  mpregenperlevel: 0,
                  crit: 0,
                  critperlevel: 0,
                  attackdamage: 60,
                  attackdamageperlevel: 5,
                  attackspeedperlevel: 2.5,
                  attackspeed: 0.651,
                },
              },
            },
          },
        })
      ),
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
