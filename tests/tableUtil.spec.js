import { getTotalWidth } from '../src/tableUtil';

describe('tableUtil', () => {
  describe('#getTotalWidth', () => {
    it('returns sum of widths from array of objects', () => {
      const cols = [{ width: 2 }, { width: 2 }, { width: 1 }, { width: 1 }];
      expect(getTotalWidth(cols)).toEqual(6);
    });
  });
});
