import {describe, it, expect} from '@jest/globals';
import {PaymentInfo} from '../../redux/paymentSlice';
import {fakePaymentAPI} from '../paymentAPI';

describe('fakePaymentAPI', () => {
  const validPaymentData: PaymentInfo = {
    cardNumber: '4111111111111111',
    cardHolder: 'John Doe',
    expDate: '12/25',
    cvv: '123',
  };

  const invalidPaymentData: PaymentInfo = {
    cardNumber: '4111111111111110',
    cardHolder: 'John Doe',
    expDate: '12/25',
    cvv: '456',
  };

  it('should resolve with status "ok" for valid payment data', async () => {
    const response = await fakePaymentAPI(validPaymentData);
    expect(response).toEqual({status: 'ok'});
  });

  it('should reject with an error message "Tarjeta inválida" for invalid payment data', async () => {
    await expect(fakePaymentAPI(invalidPaymentData)).rejects.toThrow(
      'Tarjeta inválida',
    );
  });

  it('should simulate a delay of 3 seconds before resolving or rejecting', async () => {
    const start = Date.now();
    try {
      await fakePaymentAPI(validPaymentData);
    } catch (e) {}
    const end = Date.now();
    expect(end - start).toBeGreaterThanOrEqual(3000);
  });
});
