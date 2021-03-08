import axios, { AxiosInstance, AxiosResponse } from 'axios';

const riot: AxiosInstance = axios.create({
  baseURL: 'https://na1.api.riotgames.com/lol',
});

export interface RiotAPI {
  users: {
    get: (username: string) => Promise<AxiosResponse>;
  };
  matchList: {
    get: (userId: string) => Promise<AxiosResponse>;
  };
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
};

export default riotAPI;
