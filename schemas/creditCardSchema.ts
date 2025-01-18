import {z} from 'zod';

/**
 * Esquema de validación para formularios de tarjeta de crédito.
 * Valida los campos de la tarjeta: número, titular, fecha de expiración y CVV.
 */
export const creditCardSchema = z.object({
  /**
   * Validación para el número de tarjeta de crédito.
   * - Longitud exacta de 19 caracteres (incluye espacios).
   * - Implementa el algoritmo de Luhn para validar el número.
   */
  cardNumber: z
    .string()
    .min(19, 'Número de tarjeta debe tener 16 dígitos')
    .max(19, 'Número de tarjeta debe tener 16 dígitos')
    .refine(
      num => {
        const digits = num.replace(/\s/g, '');

        if (digits.length !== 16) {
          return false;
        }

        // Algoritmo de Luhn para validar el número de tarjeta.
        let sum = 0;
        let isEven = false;

        // Itera los dígitos de derecha a izquierda.
        for (let i = digits.length - 1; i >= 0; i--) {
          let digit = parseInt(digits[i], 10);

          // Duplica los dígitos en posiciones pares.
          if (isEven) {
            digit *= 2;
            if (digit > 9) {
              digit -= 9;
            }
          }

          // Acumula el valor en la suma total.
          sum += digit;
          isEven = !isEven;
        }

        return sum % 10 === 0;
      },
      {message: 'Número de tarjeta inválido'},
    ),

  /**
   * Validación para el nombre del titular de la tarjeta.
   * - Longitud mínima de 3 caracteres.
   * - Solo permite letras y espacios.
   * - Normaliza el valor eliminando espacios adicionales y convirtiendo a mayúsculas.
   */
  cardHolder: z
    .string()
    .min(3, 'Nombre debe tener al menos 3 caracteres')
    .regex(/^[a-zA-Z\s]+$/, 'Nombre solo puede contener letras y espacios')
    .transform(value => value.trim().replace(/\s+/g, ' ').toUpperCase()),

  /**
   * Validación para la fecha de expiración.
   * - Formato: `MM/YY`.
   * - Verifica que sea una fecha futura válida dentro de los próximos 10 años.
   */
  expDate: z
    .string()
    .regex(/^\d{2}\/\d{2}$/, 'Formato debe ser MM/YY')
    .refine(
      date => {
        const [month, year] = date.split('/');
        const currentDate = new Date();
        const currentYear = currentDate.getFullYear() % 100; // Últimos dos dígitos del año actual.
        const currentMonth = currentDate.getMonth() + 1; // Mes actual.

        const monthNum = parseInt(month, 10);
        const yearNum = parseInt(year, 10);

        if (monthNum < 1 || monthNum > 12) {
          return false;
        }

        // Valida el rango del año.
        if (yearNum < currentYear || yearNum > currentYear + 10) {
          return false;
        }

        // Valida que la fecha no sea anterior al mes/año actuales.
        if (yearNum === currentYear && monthNum < currentMonth) {
          return false;
        }

        return true;
      },
      {
        message:
          'Fecha de expiración inválida. Debe ser una fecha futura válida no mayor a 10 años',
      },
    ),

  /**
   * Validación para el código CVV.
   * - Debe contener 3 o 4 dígitos.
   * - Valida la longitud según el tipo de tarjeta (por ejemplo, 4 dígitos para American Express).
   */
  cvv: z
    .string()
    .regex(/^\d{3,4}$/, 'CVV debe tener 3 o 4 dígitos')
    .refine(
      cvv => {
        const isAmex = false; // Simulación para validar CVVs de American Express.
        return isAmex ? cvv.length === 4 : cvv.length === 3;
      },
      {
        message: 'Longitud de CVV inválida',
      },
    ),
});

/**
 * Tipado inferido para los datos del formulario de tarjeta de crédito.
 */
export type CreditCardFormData = z.infer<typeof creditCardSchema>;

/**
 * Función para validar los datos del formulario de tarjeta de crédito.
 * @param {CreditCardFormData} data - Los datos del formulario a validar.
 * @returns {Object} - Objeto que indica si la validación fue exitosa y los errores, si los hay.
 * @property {boolean} success - `true` si la validación fue exitosa, `false` en caso contrario.
 * @property {Object|null} errors - Detalles de los errores si la validación falla, `null` si es exitosa.
 *
 * @example
 * const result = validateCreditCardForm({
 *   cardNumber: '4111 1111 1111 1111',
 *   cardHolder: 'JOHN DOE',
 *   expDate: '12/30',
 *   cvv: '123',
 * });
 * console.log(result.success); // true
 */
export const validateCreditCardForm = (data: CreditCardFormData) => {
  const result = creditCardSchema.safeParse(data);
  return {
    success: result.success,
    errors: !result.success ? result.error.flatten() : null,
  };
};
