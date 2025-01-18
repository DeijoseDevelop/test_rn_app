/**
 * Este módulo exporta una lista de productos de ejemplo (`sampleProducts`)
 * que pueden ser utilizados para pruebas o como datos iniciales en la aplicación.
 * Cada producto está representado por un objeto que implementa la interfaz `Product`.
 *
 * @module sampleProducts
 */

import {Product} from './models/product';

/**
 * Lista de productos de ejemplo.
 *
 * @example
 * ```ts
 * import { sampleProducts } from './sampleProducts';
 *
 * console.log(sampleProducts);
 * ```
 */
export const sampleProducts: Product[] = [
  {
    id: '1',
    name: 'Smartphone Pro X',
    price: 899.99,
    quantity: 5,
    image:
      'https://images.unsplash.com/photo-1511707171634-5f897ff02aa9?w=500&q=80',
  },
  {
    id: '2',
    name: 'Auriculares Bluetooth',
    price: 129.5,
    quantity: 4,
    image:
      'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=500&q=80',
  },
  {
    id: '3',
    name: 'Laptop Gamer XYZ',
    price: 1599.0,
    quantity: 1,
    image:
      'https://images.unsplash.com/photo-1496181133206-80ce9b88a853?w=500&q=80',
  },
  {
    id: '4',
    name: 'Smartwatch Series 5',
    price: 249.99,
    quantity: 2,
    image:
      'https://images.unsplash.com/photo-1579586337278-3befd40fd17a?w=500&q=80',
  },
  {
    id: '5',
    name: 'Cámara 4K',
    price: 999.0,
    quantity: 1,
    image:
      'https://images.unsplash.com/photo-1516035069371-29a1b244cc32?w=500&q=80',
  },
];
