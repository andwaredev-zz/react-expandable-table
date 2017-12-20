import sinon from 'sinon';

import { getTotalWidth, stopPropagation } from '../src/tableUtil';

describe('tableUtil', () => {
  describe('#getTotalWidth', () => {
    it('returns sum of widths from array of objects', () => {
      const cols = [{ width: 2 }, { width: 2 }, { width: 1 }, { width: 1 }];
      expect(getTotalWidth(cols)).toEqual(6);
    });
  });

  describe('#stopPropagation', () => {
    it('does not call stopPropagation if undefined', () => {
      stopPropagation();
    });

    it('calls stopPropagation if defined', () => {
      const stopPropagationSpy = sinon.spy();
      stopPropagation({ stopPropagation: stopPropagationSpy });
      expect(stopPropagationSpy.called).toBeTruthy();
      expect(stopPropagationSpy.firstCall.args).toEqual([]);
    });
  });
});
