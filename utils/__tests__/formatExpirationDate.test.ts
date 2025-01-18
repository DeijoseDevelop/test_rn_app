import {expect, describe, it} from '@jest/globals';
import { formatExpirationDate } from '../formatExpirationDate';

describe('formatExpirationDate', () => {
  it('should format a 4-digit date as MM/YY', () => {
    expect(formatExpirationDate('1224')).toBe('12/24');
  });

  it('should handle input with non-numeric characters', () => {
    expect(formatExpirationDate('12/24')).toBe('12/24');
    expect(formatExpirationDate('1a2b')).toBe('12');
  });

  it('should truncate input longer than 4 digits', () => {
    expect(formatExpirationDate('122456')).toBe('12/24');
  });

  it('should return MM if input has only two digits', () => {
    expect(formatExpirationDate('12')).toBe('12');
  });

  it('should return partial formatted date if input has less than 4 digits', () => {
    expect(formatExpirationDate('1')).toBe('1');
    expect(formatExpirationDate('123')).toBe('12/3');
  });

  it('should return an empty string if input is empty', () => {
    expect(formatExpirationDate('')).toBe('');
  });

  it('should handle input with only non-numeric characters', () => {
    expect(formatExpirationDate('abcd')).toBe('');
  });
});
