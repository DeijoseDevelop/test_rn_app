/**
 * Convierte un objeto `Map` en un objeto plano.
 *
 * @param {Map<string, number>} map - Un mapa donde las claves son cadenas y los valores son números.
 * @returns {{ [key: string]: number }} - Un objeto plano que representa el mapa.
 *
 * @example
 * const map = new Map([['a', 1], ['b', 2]]);
 * serializeMap(map); // { a: 1, b: 2 }
 */
export const serializeMap = (
  map: Map<string, number>,
): {[key: string]: number} => {
  return Object.fromEntries(map);
};

/**
 * Convierte un objeto plano en un objeto `Map`.
 *
 * @param {{ [key: string]: number }} obj - Un objeto plano donde las claves son cadenas y los valores son números.
 * @returns {Map<string, number>} - Un mapa que representa el objeto plano.
 *
 * @example
 * const obj = { a: 1, b: 2 };
 * deserializeMap(obj); // Map { 'a' => 1, 'b' => 2 }
 */
export const deserializeMap = (obj: {
  [key: string]: number;
}): Map<string, number> => {
  return new Map(Object.entries(obj));
};
