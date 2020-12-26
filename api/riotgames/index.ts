import axios, { AxiosInstance, AxiosResponse } from 'axios';

const riot: AxiosInstance = axios.create({
  baseURL: 'https://na1.api.riotgames.com/lol/summoner/v4/summoners/by-name',
});

export interface RiotAPI {
  users: {
    get: (username: string) => Promise<AxiosResponse>;
  };
}

const riotAPI: RiotAPI = {
  users: {
    get: (username: string): Promise<AxiosResponse> => {
      return riot.get(`/${username}`, {
        headers: {
          'X-Riot-Token': process.env.RIOT_API_KEY,
        },
      });
    },
  },
};

export default riotAPI;
