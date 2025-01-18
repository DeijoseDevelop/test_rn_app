import {PaymentInfo} from '../redux/paymentSlice';

/**
 * Simula el procesamiento de un pago utilizando datos de tarjeta.
 *
 * @param {PaymentInfo} paymentData - Información de pago que incluye el número de tarjeta, titular, etc.
 * @returns {Promise<any>} - Promesa que se resuelve si el pago es exitoso o se rechaza si es inválido.
 *
 * ### Lógica de Aprobación:
 * - Si el número de tarjeta termina en '0', el pago es rechazado.
 * - Si no termina en '0', el pago es aprobado.
 *
 * @example
 * const paymentData = {
 *   cardNumber: '4111111111111111',
 *   cardHolder: 'John Doe',
 *   expDate: '12/25',
 * };
 *
 * fakePaymentAPI(paymentData)
 *   .then(response => console.log(response)) // { status: 'ok' }
 *   .catch(error => console.error(error.message)); // 'Tarjeta inválida'
 */
export const fakePaymentAPI = (paymentData: PaymentInfo): Promise<any> => {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      if (paymentData.cardNumber.endsWith('0')) {
        reject(new Error('Tarjeta inválida'));
      } else {
        resolve({status: 'ok'});
      }
    }, 3000); // Simula un retraso en la respuesta del servidor
  });
};
