import axios, { AxiosInstance, AxiosResponse } from "axios";

const dbAPI: AxiosInstance = axios.create({
  baseURL: `https://${process.env.FIREBASE_PROJECT_ID}.appspot.com`,
  withCredentials: true,
});

export interface DBAPI {
  users: {
    get: (userName: string) => Promise<AxiosResponse>;
  };
}

const idiq: DBAPI = {
  users: {
    get: (name: string): Promise<AxiosResponse> => {
      return dbAPI.get(`/users/${name}`);
    },
  },
};
