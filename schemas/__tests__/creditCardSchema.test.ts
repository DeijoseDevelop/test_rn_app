import {describe, it, expect} from '@jest/globals';
import { validateCreditCardForm } from '../creditCardSchema';

describe('Credit Card Schema Validation', () => {
  it('should validate a valid credit card form', () => {
    const validData = {
      cardNumber: '4111 1111 1111 1111',
      cardHolder: 'JOHN DOE',
      expDate: '12/30',
      cvv: '123',
    };

    const result = validateCreditCardForm(validData);
    expect(result.success).toBe(true);
    expect(result.errors).toBeNull();
  });

  it('should fail for an invalid card number', () => {
    const invalidData = {
      cardNumber: '4111 1111 1111 1110', // Invalid Luhn checksum
      cardHolder: 'JOHN DOE',
      expDate: '12/30',
      cvv: '123',
    };

    const result = validateCreditCardForm(invalidData);
    expect(result.success).toBe(false);
    expect(result.errors?.fieldErrors.cardNumber).toContain(
      'Número de tarjeta inválido',
    );
  });

  it('should fail for an invalid card holder name', () => {
    const invalidData = {
      cardNumber: '4111 1111 1111 1111',
      cardHolder: 'J0HN D0E', // Contains invalid characters
      expDate: '12/30',
      cvv: '123',
    };

    const result = validateCreditCardForm(invalidData);
    expect(result.success).toBe(false);
    expect(result.errors?.fieldErrors.cardHolder).toContain(
      'Nombre solo puede contener letras y espacios',
    );
  });

  it('should fail for an invalid expiration date format', () => {
    const invalidData = {
      cardNumber: '4111 1111 1111 1111',
      cardHolder: 'JOHN DOE',
      expDate: '1230', // Missing "/"
      cvv: '123',
    };

    const result = validateCreditCardForm(invalidData);
    expect(result.success).toBe(false);
    expect(result.errors?.fieldErrors.expDate).toContain(
      'Formato debe ser MM/YY',
    );
  });

  it('should fail for an expired date', () => {
    const invalidData = {
      cardNumber: '4111 1111 1111 1111',
      cardHolder: 'JOHN DOE',
      expDate: '01/22', // Expired date
      cvv: '123',
    };

    const result = validateCreditCardForm(invalidData);
    expect(result.success).toBe(false);
    expect(result.errors?.fieldErrors.expDate).toContain(
      'Fecha de expiración inválida. Debe ser una fecha futura válida no mayor a 10 años',
    );
  });

  it('should fail for an invalid CVV length', () => {
    const invalidData = {
      cardNumber: '4111 1111 1111 1111',
      cardHolder: 'JOHN DOE',
      expDate: '12/30',
      cvv: '12', // Too short
    };

    const result = validateCreditCardForm(invalidData);
    expect(result.success).toBe(false);
    expect(result.errors?.fieldErrors.cvv).toContain(
      'CVV debe tener 3 o 4 dígitos',
    );
  });
});
