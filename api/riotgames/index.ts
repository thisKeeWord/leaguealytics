/* eslint-disable no-unused-vars */
import axios, { AxiosInstance, AxiosResponse } from 'axios';
import rateLimit from 'axios-rate-limit';

const riot: AxiosInstance = rateLimit(axios.create({
  baseURL: 'https://na1.api.riotgames.com/lol',
}), { maxRequests: 500, perMilliseconds: 10000 });

const riotStatic: AxiosInstance = axios.create({
  baseURL: 'https://ddragon.leagueoflegends.com',
});

export interface RiotAPI {
  users: {
    get: (username: string) => Promise<AxiosResponse>;
  };
  matchList: {
    get: (userId: string) => Promise<AxiosResponse>;
  };
  patch: {
    version: {
      get: () => Promise<AxiosResponse>;
    };
    data: {
      get: (patchVersion: string) => Promise<AxiosResponse>;
    };
  };
  match: {
    overview: {
      get: (matchId: string) => Promise<AxiosResponse>;
    };
    timeline: {
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
