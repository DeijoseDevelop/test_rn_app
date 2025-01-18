import EncryptedStorage from 'react-native-encrypted-storage';

/**
 * Interfaz que define los datos de pago seguros que serán almacenados.
 */
interface SecurePaymentData {
  cardNumber: string; // Número completo de la tarjeta
  cardHolder: string; // Nombre del titular de la tarjeta
  expDate: string; // Fecha de vencimiento en formato MM/YY
  lastFourDigits: string; // Últimos 4 dígitos de la tarjeta
  transactionId?: string; // ID de la transacción, opcional
  timestamp: number; // Marca de tiempo del momento de almacenamiento
}

/**
 * Claves utilizadas para identificar los datos almacenados de forma segura.
 */
export const SecureStorageKeys = {
  PAYMENT_DATA: 'SECURE_PAYMENT_DATA',
};

/**
 * Servicio que proporciona métodos para interactuar con el almacenamiento seguro.
 */
export const SecureStorageService = {
  /**
   * Almacena los datos de pago de forma segura.
   *
   * @param {SecurePaymentData} paymentData - Los datos de pago que se deben almacenar.
   * @throws {Error} - Lanza un error si el almacenamiento falla.
   * @returns {Promise<void>} - Una promesa que se resuelve cuando los datos se almacenan correctamente.
   */
  storePaymentData: async (paymentData: SecurePaymentData): Promise<void> => {
    try {
      const jsonValue = JSON.stringify(paymentData);
      await EncryptedStorage.setItem(SecureStorageKeys.PAYMENT_DATA, jsonValue);
      console.log('Payment data stored successfully');
    } catch (error) {
      console.error('Error storing payment data:', error);
      throw new Error('Failed to store payment data securely');
    }
  },

  /**
   * Recupera los datos de pago almacenados de forma segura.
   *
   * @returns {Promise<SecurePaymentData | null>} - Los datos de pago recuperados o `null` si no existen.
   */
  getPaymentData: async (): Promise<SecurePaymentData | null> => {
    try {
      const jsonValue = await EncryptedStorage.getItem(SecureStorageKeys.PAYMENT_DATA);
      return jsonValue != null ? JSON.parse(jsonValue) : null;
    } catch (error) {
      console.error('Error retrieving payment data:', error);
      return null;
    }
  },

  /**
   * Elimina los datos de pago almacenados de forma segura.
   *
   * @throws {Error} - Lanza un error si la eliminación falla.
   * @returns {Promise<void>} - Una promesa que se resuelve cuando los datos se eliminan correctamente.
   */
  removePaymentData: async (): Promise<void> => {
    try {
      await EncryptedStorage.removeItem(SecureStorageKeys.PAYMENT_DATA);
      console.log('Payment data removed successfully');
    } catch (error) {
      console.error('Error removing payment data:', error);
      throw new Error('Failed to remove payment data');
    }
  },

  /**
   * Limpia todo el almacenamiento seguro.
   *
   * @throws {Error} - Lanza un error si la operación de limpieza falla.
   * @returns {Promise<void>} - Una promesa que se resuelve cuando el almacenamiento se limpia correctamente.
   */
  clearStorage: async (): Promise<void> => {
    try {
      await EncryptedStorage.clear();
      console.log('Storage cleared successfully');
    } catch (error) {
      console.error('Error clearing storage:', error);
      throw new Error('Failed to clear storage');
    }
  },
};
