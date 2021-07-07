import faker from 'faker';
import api from '../api';
import { getSummonersData } from './getSummonersData';

jest.mock('../api');
const res = {
  send: jest.fn(),
};

describe('getSummonersData', () => {
  it('calls the summoners.doc api route', async () => {
    const spy = jest.spyOn(api.summoners, 'doc');
    await getSummonersData({ params: { version: faker.random.alphaNumeric() } }, res);

    expect(spy).toHaveBeenCalled();
  });

  // fix later
  xit('calls riotAPI.summoners api route', async () => {
    const firebaseSpy = jest.spyOn(api.summoners, 'doc');
    const get = jest.fn();
    const doc = jest.fn(() => ({ get }));
    firebaseSpy.mockReturnValueOnce((({ doc } as unknown) as any));
    const spy = jest.spyOn(api.riotAPI.summoners, 'get');
    await getSummonersData({ params: { version: faker.random.alphaNumeric() } }, res);

    expect(spy).toHaveBeenCalled();
  });
});
