/**
 * Da formato a un número de tarjeta de crédito en bloques de 4 dígitos separados por espacios.
 *
 * @param {string} text - El texto sin procesar que contiene el número de tarjeta.
 *                        Puede incluir caracteres no numéricos.
 * @returns {string} - El número de tarjeta formateado con bloques de 4 dígitos
 *                     separados por espacios, con un máximo de 19 caracteres.
 *
 * @example
 * formatCardNumber('4111111111111111'); // '4111 1111 1111 1111'
 * formatCardNumber('4111-1111-1111-1111'); // '4111 1111 1111 1111'
 * formatCardNumber('41111111111111111111'); // '4111 1111 1111 1111'
 */
export const formatCardNumber = (text: string): string => {
  const cleaned = text.replace(/\D/g, '');

  const chunks = cleaned.match(/.{1,4}/g) || [];

  return chunks.join(' ').substring(0, 19);
};
