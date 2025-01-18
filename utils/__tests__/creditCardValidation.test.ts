import { getCardType, validateCardNumber } from '../creditCardValidation';
import {expect, describe, it} from '@jest/globals';

describe('validateCardNumber', () => {
  it('should return false for empty input', () => {
    expect(validateCardNumber('')).toBe(false);
  });

  it('should return false for input with less than 13 digits', () => {
    expect(validateCardNumber('123')).toBe(false);
    expect(validateCardNumber('4111 1111 1')).toBe(false);
  });

  it('should return true for input with at least 13 digits', () => {
    expect(validateCardNumber('4111 1111 1111')).toBe(false);
    expect(validateCardNumber(' 4111 1111 1111 1111 ')).toBe(true);
  });
});

describe('getCardType', () => {
  it('should return "VISA" for numbers starting with 4', () => {
    expect(getCardType('4111 1111 1111 1111')).toBe('VISA');
  });

  it('should return "MasterCard" for numbers starting with 51-55', () => {
    expect(getCardType('5111 1111 1111 1111')).toBe('MasterCard');
    expect(getCardType('5211 1111 1111 1111')).toBe('MasterCard');
  });

  it('should return null for numbers not matching any pattern', () => {
    expect(getCardType('1234')).toBeNull();
    expect(getCardType('6011 1111 1111 1111')).toBeNull();
  });

  it('should handle input with spaces', () => {
    expect(getCardType(' 4 1 11 1111 1111 ')).toBe('VISA');
    expect(getCardType('  5  11 1111 1111')).toBe('MasterCard');
  });
});
