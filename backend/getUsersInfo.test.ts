import faker from 'faker';
import api from '../api';
import { getUsersInfo } from './getUsersInfo';

jest.mock('../api');
const req = {
  params: {
    username: faker.random.word(),
  },
};
const res = {
  send: jest.fn(),
};

describe('getUsersInfo', () => {
  it('calls firebase users collection api route', async () => {
    const spy = jest.spyOn(api.users, 'doc');
    await getUsersInfo(req, res);

    expect(spy).toHaveBeenCalledWith(req.params.username);
  });

  it('calls "riotAPI.users" api route', async () => {
    const spy = jest.spyOn(api.riotAPI.users, 'get');
    await getUsersInfo(req, res);

    expect(spy).toHaveBeenCalledWith(req.params.username);
  });
});
