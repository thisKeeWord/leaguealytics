import faker from 'faker';
import api from '../api';
import { generateAxiosResponseObject } from '../utils/helper';
import { getMatchData } from './getMatchData';

jest.mock('../api');

const req = {
  params: {
    username: faker.random.alphaNumeric,
    matchId: faker.datatype.number(),
  },
};
const res = {
  send: jest.fn(),
};

describe('getMatchData', () => {
  it('calls firebase users collection api route', async () => {
    jest
      .spyOn(api.riotAPI.match.timeline, 'get')
      .mockImplementationOnce((): any => generateAxiosResponseObject({}, { status: 200 }));

    const spy = jest.spyOn(api.users, 'doc');
    await getMatchData(req, res);

    expect(spy).toHaveBeenCalled();
  });

  it('calls "riotAPI.match.timeline" api route', async () => {
    const spy = jest.spyOn(api.riotAPI.match.timeline, 'get');
    spy.mockImplementationOnce((): any => generateAxiosResponseObject({}, { status: 200 }));

    await getMatchData(req, res);

    expect(spy).toHaveBeenCalledWith(req.params.matchId);
  });

  it('throws with message from endpoint if unsuccessful api call', async () => {
    const unsuccessfulRequestResponse = generateAxiosResponseObject({ data: {} }, { status: 400 });
    jest
      .spyOn(api.riotAPI.match.timeline, 'get')
      .mockImplementationOnce((): any => unsuccessfulRequestResponse);

    await expect(getMatchData({}, res)).rejects.toThrow();
  });
});
