import api from '../api';
import { generateAxiosResponseObject } from '../utils/helper';
import { getPatchData } from './getPatchData';

jest.mock('../api');
const res = {
  send: jest.fn(),
};

describe('getPatchData', () => {
  it('calls "riotAPI.patch.version" api route', async () => {
    const spy = jest.spyOn(api.riotAPI.patch.version, 'get');
    await getPatchData({}, res);

    expect(spy).toHaveBeenCalled();
  });

  it('calls firebase patchData api route', async () => {
    const spy = jest.spyOn(api.patchData, 'doc');
    await getPatchData({}, res);

    expect(spy).toHaveBeenCalled();
  });

  it('calls "riotAPI.patch.data" api route', async () => {
    const fakeVersion = '0.1';
    const basicSuccessResponse = generateAxiosResponseObject([fakeVersion], { status: 200 });
    jest
      .spyOn(api.riotAPI.patch.version, 'get')
      .mockImplementationOnce((): any => basicSuccessResponse);
    jest
      .spyOn(api.riotAPI.patch.data, 'get')
      .mockImplementationOnce((): any => basicSuccessResponse);
    const spy = jest.spyOn(api.riotAPI.patch.data, 'get');
    await getPatchData({}, res);

    expect(spy).toHaveBeenCalledWith(fakeVersion);
  });
});
