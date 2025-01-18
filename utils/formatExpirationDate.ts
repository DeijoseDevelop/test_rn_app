/**
 * Da formato a una fecha de expiración en el formato MM/YY.
 *
 * @param {string} text - El texto sin procesar que contiene la fecha de expiración.
 *                        Puede incluir caracteres no numéricos.
 * @returns {string} - La fecha de expiración formateada en el formato MM/YY.
 *                     Si no se pueden formar ambos componentes (mes y año),
 *                     retorna los caracteres disponibles.
 *
 * @example
 * formatExpirationDate('1224'); // '12/24'
 * formatExpirationDate('12/24'); // '12/24'
 * formatExpirationDate('12'); // '12'
 * formatExpirationDate('1a2b'); // '12'
 */
export const formatExpirationDate = (text: string): string => {
  const cleaned = text.replace(/\D/g, '');

  const limited = cleaned.slice(0, 4);

  if (limited.length > 2) {
    return limited.slice(0, 2) + '/' + limited.slice(2);
  }

  return limited;
};
