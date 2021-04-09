/* eslint-disable no-unused-vars */
import axios, { AxiosInstance, AxiosResponse } from 'axios';

const riot: AxiosInstance = axios.create({
  baseURL: 'https://na1.api.riotgames.com/lol',
});

const riotStatic: AxiosInstance = axios.create({
  baseURL: 'https://ddragon.leagueoflegends.com',
});

export interface RiotAPI {
  users: {
    // eslint-disable-next-line no-unused-vars
    get: (username: string) => Promise<AxiosResponse>;
  };
  matchList: {
    // eslint-disable-next-line no-unused-vars
    get: (userId: string) => Promise<AxiosResponse>;
  };
  patch: {
    version: {
      // eslint-disable-next-line no-unused-vars
      get: () => Promise<AxiosResponse>;
    };
    data: {
      // eslint-disable-next-line no-unused-vars
      get: (patchVersion: string) => Promise<AxiosResponse>;
    };
  };
  match: {
    overview: {
      // eslint-disable-next-line no-unused-vars
      get: (matchId: string) => Promise<AxiosResponse>;
    };
    timeline: {
      // eslint-disable-next-line no-unused-vars
      get: (matchId: string) => Promise<AxiosResponse>;
    };
  };
}

const riotAPI: RiotAPI = {
  users: {
    get: (username: string): Promise<AxiosResponse> => riot.get(`/summoner/v4/summoners/by-name/${username}`, {
      headers: {
        'X-Riot-Token': process.env.RIOT_API_KEY,
      },
    }),
  },
  matchList: {
    get: (userId: string): Promise<AxiosResponse> => riot.get(`/match/v4/matchlists/by-account/${userId}`, {
      headers: {
        'X-Riot-Token': process.env.RIOT_API_KEY,
      },
    }),
  },
  patch: {
    version: {
      get: (): Promise<AxiosResponse> => riotStatic.get('/api/versions.json'),
    },
    data: {
      get: (patchVersion: string): Promise<AxiosResponse> => riotStatic.get(`/cdn/${patchVersion}/data/en_US/champion.json`),
    },
  },
  match: {
    overview: {
      get: (matchId: string): Promise<AxiosResponse> => riot.get(`/match/v4/matches/${matchId}`, {
        headers: {
          'X-Riot-Token': process.env.RIOT_API_KEY,
        },
      }),
    },
    timeline: {
      get: (matchId: string): Promise<AxiosResponse> => riot.get(`/match/v4/timelines/by-match/${matchId}`, {
        headers: {
          'X-Riot-Token': process.env.RIOT_API_KEY,
        },
      }),
    },
  },
};

export default riotAPI;
