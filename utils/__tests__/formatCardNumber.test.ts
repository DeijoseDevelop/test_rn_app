import { formatCardNumber } from '../formatCardNumber';
import {expect, describe, it} from '@jest/globals';

describe('formatCardNumber', () => {
  it('should format a number into blocks of 4 digits separated by spaces', () => {
    expect(formatCardNumber('4111111111111111')).toBe('4111 1111 1111 1111');
  });

  it('should handle input with non-numeric characters', () => {
    expect(formatCardNumber('4111-1111-1111-1111')).toBe('4111 1111 1111 1111');
    expect(formatCardNumber('4111 1111 1111 1111')).toBe('4111 1111 1111 1111');
  });

  it('should truncate the result to a maximum of 19 characters', () => {
    expect(formatCardNumber('41111111111111111111')).toBe(
      '4111 1111 1111 1111',
    );
  });

  it('should return an empty string if input is empty', () => {
    expect(formatCardNumber('')).toBe('');
  });

  it('should return formatted output for partial card numbers', () => {
    expect(formatCardNumber('4111')).toBe('4111');
    expect(formatCardNumber('411111')).toBe('4111 11');
    expect(formatCardNumber('411111111')).toBe('4111 1111 1');
  });

  it('should handle input with only non-numeric characters', () => {
    expect(formatCardNumber('abcd-efgh')).toBe('');
  });
});
