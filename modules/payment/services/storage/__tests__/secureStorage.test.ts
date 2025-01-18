import {jest, describe, it, expect, afterEach} from '@jest/globals';

jest.mock('react-native-encrypted-storage', () => ({
  setItem: jest.fn().mockImplementation(() => Promise.resolve()),
  getItem: jest.fn().mockImplementation(() => Promise.resolve(null)),
  removeItem: jest.fn().mockImplementation(() => Promise.resolve()),
  clear: jest.fn().mockImplementation(() => Promise.resolve()),
}));

import EncryptedStorage from 'react-native-encrypted-storage';
import {SecureStorageKeys, SecureStorageService} from '../secureStorage';

interface SecurePaymentData {
  cardNumber: string;
  cardHolder: string;
  expDate: string;
  lastFourDigits: string;
  transactionId?: string;
  timestamp: number;
}

describe('SecureStorageService', () => {
  const mockPaymentData: SecurePaymentData = {
    cardNumber: '4111111111111111',
    cardHolder: 'John Doe',
    expDate: '12/25',
    lastFourDigits: '1111',
    transactionId: 'txn_123456',
    timestamp: Date.now(),
  };

  afterEach(() => {
    jest.clearAllMocks();
  });

  describe('storePaymentData', () => {
    it('should store payment data successfully', async () => {
      await SecureStorageService.storePaymentData(mockPaymentData);

      expect(EncryptedStorage.setItem).toHaveBeenCalledWith(
        SecureStorageKeys.PAYMENT_DATA,
        JSON.stringify(mockPaymentData),
      );
    });

    it('should throw an error if storing fails', async () => {
      const mockError = new Error('Storage error');

      (
        EncryptedStorage.setItem as jest.MockedFunction<
          (key: string, value: string) => Promise<void>
        >
      ).mockRejectedValueOnce(mockError);

      await expect(
        SecureStorageService.storePaymentData(mockPaymentData),
      ).rejects.toThrow('Failed to store payment data securely');
    });
  });

  describe('getPaymentData', () => {
    it('should retrieve payment data successfully', async () => {
      const mockStoredData = JSON.stringify(mockPaymentData);
      (
        EncryptedStorage.getItem as jest.MockedFunction<
          (key: string) => Promise<string | null>
        >
      ).mockResolvedValueOnce(mockStoredData);

      const result = await SecureStorageService.getPaymentData();
      expect(result).toEqual(mockPaymentData);
    });

    it('should return null if no data exists', async () => {
      (
        EncryptedStorage.getItem as jest.MockedFunction<
          (key: string) => Promise<string | null>
        >
      ).mockResolvedValueOnce(null);

      const result = await SecureStorageService.getPaymentData();
      expect(result).toBeNull();
    });

    it('should return null if an error occurs', async () => {
      const mockError = new Error('Retrieval error');
      (
        EncryptedStorage.getItem as jest.MockedFunction<
          (key: string) => Promise<string | null>
        >
      ).mockRejectedValueOnce(mockError);

      const result = await SecureStorageService.getPaymentData();
      expect(result).toBeNull();
    });
  });

  describe('removePaymentData', () => {
    it('should remove payment data successfully', async () => {
      await SecureStorageService.removePaymentData();

      expect(EncryptedStorage.removeItem).toHaveBeenCalledWith(
        SecureStorageKeys.PAYMENT_DATA,
      );
    });

    it('should throw an error if removal fails', async () => {
      const mockError = new Error('Removal error');
      (
        EncryptedStorage.removeItem as jest.MockedFunction<
          (key: string) => Promise<void>
        >
      ).mockRejectedValueOnce(mockError);

      await expect(SecureStorageService.removePaymentData()).rejects.toThrow(
        'Failed to remove payment data',
      );
    });
  });

  describe('clearStorage', () => {
    it('should clear storage successfully', async () => {
      await SecureStorageService.clearStorage();
      expect(EncryptedStorage.clear).toHaveBeenCalled();
    });

    it('should throw an error if clearing fails', async () => {
      const mockError = new Error('Clear error');
      (
        EncryptedStorage.clear as jest.MockedFunction<() => Promise<void>>
      ).mockRejectedValueOnce(mockError);

      await expect(SecureStorageService.clearStorage()).rejects.toThrow(
        'Failed to clear storage',
      );
    });
  });
});
