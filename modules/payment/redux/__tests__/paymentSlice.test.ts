import {jest, describe, it, expect, afterEach} from '@jest/globals';

import paymentReducer, {
  setPaymentInfo,
  clearPaymentInfo,
  setTransactionStatus,
  setTransactionError,
  PaymentState,
  PaymentInfo,
} from '../paymentSlice';
import {SecureStorageService} from '../../services/storage/secureStorage';

jest.mock('../../services/storage/secureStorage', () => ({
  SecureStorageService: {
    storePaymentData: jest.fn(),
  },
}));

describe('paymentSlice', () => {
  const initialState: PaymentState = {
    paymentInfo: null,
    transactionStatus: 'idle',
    transactionError: null,
  };

  const mockPaymentInfo: PaymentInfo = {
    cardNumber: '4111111111111111',
    cardHolder: 'John Doe',
    expDate: '12/25',
    cvv: '123',
  };

  afterEach(() => {
    jest.clearAllMocks();
  });

  it('should handle initial state', () => {
    expect(paymentReducer(undefined, {type: '@@INIT'})).toEqual(initialState);
  });

  it('should set payment info and store it in SecureStorage', () => {
    const nextState = paymentReducer(
      initialState,
      setPaymentInfo(mockPaymentInfo),
    );

    expect(nextState.paymentInfo).toEqual(mockPaymentInfo);

    // Verificar que SecureStorageService.storePaymentData se llamó con los datos correctos
    expect(SecureStorageService.storePaymentData).toHaveBeenCalledWith({
      cardNumber: mockPaymentInfo.cardNumber,
      cardHolder: mockPaymentInfo.cardHolder,
      expDate: mockPaymentInfo.expDate,
      lastFourDigits: mockPaymentInfo.cardNumber.slice(-4),
      timestamp: expect.any(Number),
      transactionId: expect.stringMatching(/^TX-\d+$/),
    });
  });

  it('should clear payment info', () => {
    const stateWithPaymentInfo = {
      ...initialState,
      paymentInfo: mockPaymentInfo,
    };

    const nextState = paymentReducer(stateWithPaymentInfo, clearPaymentInfo());

    expect(nextState.paymentInfo).toBeNull();
  });

  it('should set transaction status', () => {
    const nextState = paymentReducer(
      initialState,
      setTransactionStatus('loading'),
    );

    expect(nextState.transactionStatus).toBe('loading');
  });

  it('should set transaction error', () => {
    const errorMessage = 'Something went wrong';
    const nextState = paymentReducer(
      initialState,
      setTransactionError(errorMessage),
    );

    expect(nextState.transactionError).toBe(errorMessage);
  });
});
