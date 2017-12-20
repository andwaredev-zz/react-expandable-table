import sinon from 'sinon';

import { getTotalWidth, parseString, stopPropagation } from '../src/tableUtil';

describe('tableUtil', () => {
  describe('#getTotalWidth', () => {
    it('returns sum of widths from array of objects', () => {
      const cols = [{ width: 2 }, { width: 2 }, { width: 1 }, { width: 1 }];
      expect(getTotalWidth(cols)).toEqual(6);
    });
  });

  describe('#parseString', () => {
    it('if input is a string, simply returns input', () => {
      const input = 'input';
      expect(parseString(input)).toEqual(input);
    });

    it('if input is a number, simply returns the string conversion', () => {
      const input = 11;
      expect(parseString(input)).toEqual('11');
    });

    it('if input is a boolean, simply returns the string conversion', () => {
      const input = false;
      expect(parseString(input)).toEqual('false');
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
