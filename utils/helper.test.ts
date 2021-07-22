import { convertTimestamp, getStrokeColor, numberFormatter } from './helper';

describe('helper', () => {
  describe('convertTimestamp', () => {
    it('returns the correct value', () => {
      expect(convertTimestamp(13423423)).toEqual('03:43:43');
    });
  });

  describe('numberFormatter', () => {
    it('returns the correct rounded up value', () => {
      expect(numberFormatter(27010)).toEqual('27.0K');
    });

    it('returns the correct rounded down value', () => {
      expect(numberFormatter(27777)).toEqual('27.8K');
    });
  });

  describe('getStrokeColor', () => {
    it('returns the purple color if isCurrentPlayer is true', () => {
      expect(getStrokeColor(3, true)).toEqual('purple');
    });

    it('returns the blue color if isCurrentPlayer is false and participantId <= 5', () => {
      expect(getStrokeColor(3, false)).toEqual('#2747e8');
    });

    it('returns the red color if isCurrentPlayer is false and participantId > 5', () => {
      expect(getStrokeColor(10, false)).toEqual('#cb2124');
    });
  });
});
