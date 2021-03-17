import axios, { AxiosInstance, AxiosResponse } from 'axios';

const riot: AxiosInstance = axios.create({
  baseURL: 'https://na1.api.riotgames.com/lol',
});

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
  // match: {
  //   get: (matchId: string) => Promise<AxiosResponse>;
  // };
}

const riotAPI: RiotAPI = {
  users: {
    get: (username: string): Promise<AxiosResponse> => {
      return riot.get(`/summoner/v4/summoners/by-name/${username}`, {
        headers: {
          'X-Riot-Token': process.env.RIOT_API_KEY,
        },
      });
    },
  },
  matchList: {
    get: (userId: string): Promise<AxiosResponse> => {
      return riot.get(`/match/v4/matchlists/by-account/${userId}`, {
        headers: {
          'X-Riot-Token': process.env.RIOT_API_KEY,
        },
      });
    },
  },
  patch: {
    version: {
      get: (): Promise<AxiosResponse> => {
        return riotStatic.get('/api/versions.json');
      },
    },
    data: {
      get: (patchVersion: string): Promise<AxiosResponse> => {
        return riotStatic.get(`/cdn/${patchVersion}/data/en_US/champion.json`);
      },
    },
  },
  // match: {
  //   get: (matchId: string): Promise<AxiosResponse> => {
  //     return riot.
  //   }
  // }
};

export default riotAPI;
