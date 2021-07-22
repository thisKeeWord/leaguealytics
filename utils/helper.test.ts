import { convertTimestamp, numberFormatter } from './helper';

describe('helper', () => {
  it('returns the correct value from convertTimestamp function', () => {
    expect(convertTimestamp(13423423)).toEqual('03:43:43');
  });

  it('returns the correct value from numberFormatter function', () => {
    expect(numberFormatter(27010)).toEqual('27.0K');
    expect(numberFormatter(27777)).toEqual('27.8K');
  });
});
