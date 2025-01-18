import {createSlice, PayloadAction} from '@reduxjs/toolkit';
import {SecureStorageService} from '../services/storage/secureStorage';

/**
 * Información de pago de un usuario.
 */
export interface PaymentInfo {
  cardNumber: string; // Número completo de la tarjeta
  cardHolder: string; // Nombre del titular de la tarjeta
  expDate: string; // Fecha de vencimiento en formato MM/YY
  cvv: string; // Código de seguridad de la tarjeta (3-4 dígitos)
}

/**
 * Estado global relacionado con el proceso de pagos.
 */
export interface PaymentState {
  paymentInfo: PaymentInfo | null; // Información de pago actualmente almacenada
  transactionStatus: 'idle' | 'loading' | 'success' | 'error'; // Estado de la transacción
  transactionError: string | null; // Mensaje de error si ocurre algún problema
}

/**
 * Estado inicial del slice de pago.
 */
const initialState: PaymentState = {
  paymentInfo: null,
  transactionStatus: 'idle',
  transactionError: null,
};

/**
 * Slice de Redux para manejar la lógica de pago.
 */
const paymentSlice = createSlice({
  name: 'payment',
  initialState,
  reducers: {
    /**
     * Configura la información de pago en el estado global y almacena los datos en almacenamiento seguro.
     * @param state - Estado actual.
     * @param action - Acción que contiene la información de pago.
     */
    setPaymentInfo: (state, action: PayloadAction<PaymentInfo>) => {
      state.paymentInfo = action.payload;

      const paymentInfo = state.paymentInfo;

      // Construcción de los datos a almacenar en SecureStorage
      const securePaymentData = {
        cardNumber: paymentInfo.cardNumber,
        cardHolder: paymentInfo.cardHolder,
        expDate: paymentInfo.expDate,
        lastFourDigits: paymentInfo.cardNumber.slice(-4),
        timestamp: Date.now(),
        transactionId: `TX-${Date.now()}`,
      };

      SecureStorageService.storePaymentData(securePaymentData);
    },

    /**
     * Limpia la información de pago almacenada en el estado global.
     * @param state - Estado actual.
     */
    clearPaymentInfo: state => {
      state.paymentInfo = null;
    },

    /**
     * Configura el estado de la transacción actual.
     * @param state - Estado actual.
     * @param action - Acción que contiene el nuevo estado de la transacción.
     */
    setTransactionStatus: (
      state,
      action: PayloadAction<PaymentState['transactionStatus']>,
    ) => {
      state.transactionStatus = action.payload;
    },

    /**
     * Configura el mensaje de error de transacción.
     * @param state - Estado actual.
     * @param action - Acción que contiene el mensaje de error.
     */
    setTransactionError: (state, action: PayloadAction<string | null>) => {
      state.transactionError = action.payload;
    },
  },
});

export const {
  setPaymentInfo,
  clearPaymentInfo,
  setTransactionStatus,
  setTransactionError,
} = paymentSlice.actions;

export default paymentSlice.reducer;
