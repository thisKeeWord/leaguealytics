/* eslint-disable no-unused-vars */
import axios, { AxiosInstance, AxiosResponse } from 'axios';
import rateLimit from 'axios-rate-limit';

const riot: AxiosInstance = rateLimit(axios.create({
  baseURL: 'https://americas.api.riotgames.com/lol',
}), { maxRequests: 1, perMilliseconds: 2000 });

const riotUser: AxiosInstance = rateLimit(axios.create({
  baseURL: 'https://na1.api.riotgames.com/lol',
}), { maxRequests: 1, perMilliseconds: 2000 });

const riotStatic: AxiosInstance = axios.create({
  baseURL: 'https://ddragon.leagueoflegends.com',
});

export interface RiotAPI {
  users: {
    get: (username: string) => Promise<AxiosResponse>;
  };
  matchList: {
    get: (puuid: string) => Promise<AxiosResponse>;
  };
  patch: {
    version: {
      get: () => Promise<AxiosResponse>;
    };
    data: {
      get: (patchVersion: string) => Promise<AxiosResponse>;
    };
  };
  summoners: {
      get: (patchVersion: string) => Promise<AxiosResponse>;
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
    get: (username: string): Promise<AxiosResponse> => riotUser.get(`/summoner/v4/summoners/by-name/${username}`, {
      headers: {
        'X-Riot-Token': process.env.RIOT_API_KEY2,
      },
    }),
  },
  matchList: {
    get: (puuid: string): Promise<AxiosResponse> => riot.get(`/match/v5/matches/by-puuid/${puuid}/ids?start=0&count=20`, {
      headers: {
        'X-Riot-Token': process.env.RIOT_API_KEY2,
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
  summoners: {
    get: (patchVersion: string): Promise<AxiosResponse> => riotStatic.get(`/cdn/${patchVersion}/data/en_US/summoner.json`),
  },
  match: {
    overview: {
      get: (matchId: string): Promise<AxiosResponse> => riot.get(`/match/v5/matches/${matchId}`, {
        headers: {
          'X-Riot-Token': process.env.RIOT_API_KEY2,
        },
      }),
    },
    timeline: {
      get: (matchId: string): Promise<AxiosResponse> => riot.get(`/match/v5/matches/${matchId}/timeline`, {
        headers: {
          'X-Riot-Token': process.env.RIOT_API_KEY2,
        },
      }),
    },
  },
};

export default riotAPI;
