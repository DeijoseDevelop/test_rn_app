/**
 * Valida si un número de tarjeta cumple con la longitud mínima requerida.
 *
 * @param {string} value - El número de la tarjeta como cadena de texto.
 *                         Puede contener espacios, que serán ignorados.
 * @returns {boolean} - Retorna `true` si el número tiene al menos 13 dígitos después de
 *                      eliminar espacios. De lo contrario, retorna `false`.
 *
 * @example
 * validateCardNumber('4111 1111 1111 1111'); // true
 * validateCardNumber('123'); // false
 */
export const validateCardNumber = (value: string): boolean => {
  // Verificar si el valor está vacío
  if (!value) {return false;}

  // Eliminar todos los espacios y verificar longitud mínima de 13 caracteres
  const sanitized = value.replace(/\s+/g, '');
  return sanitized.length >= 13;
};

/**
 * Determina el tipo de tarjeta (MasterCard o VISA) según su patrón de inicio.
 *
 * @param {string} value - El número de la tarjeta como cadena de texto.
 *                         Puede contener espacios, que serán ignorados.
 * @returns {string | null} - Retorna `"VISA"` si el número comienza con `4`,
 *                            `"MasterCard"` si comienza con un rango entre `51` y `55`.
 *                            Retorna `null` si no coincide con ningún patrón conocido.
 *
 * @example
 * getCardType('4111 1111 1111 1111'); // 'VISA'
 * getCardType('5111 1111 1111 1111'); // 'MasterCard'
 * getCardType('1234'); // null
 */
export const getCardType = (value: string): string | null => {
  const sanitized = value.replace(/\s+/g, '');

  if (/^4/.test(sanitized)) {
    return 'VISA';
  }

  else if (/^5[1-5]/.test(sanitized)) {
    return 'MasterCard';
  }

  return null;
};
