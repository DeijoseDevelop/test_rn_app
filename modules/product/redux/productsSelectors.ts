import {createSelector} from '@reduxjs/toolkit';
import {CartItem, ProductsState} from '../data/models/product';
import {deserializeMap} from '../../../utils/serializedMap';

/**
 * Selector base para obtener el estado de los productos.
 * @param state - Estado global de Redux.
 * @returns El estado de los productos.
 */
const selectProducts = (state: {products: ProductsState}) => state.products;

/**
 * Selector para obtener los elementos del carrito en un formato detallado.
 * Cada elemento incluye los datos del producto y la cantidad en el carrito.
 * @returns Lista de objetos `CartItem` que representan los elementos del carrito.
 */
export const selectCartItems = createSelector([selectProducts], products => {
  const cart = deserializeMap(products.cartItems as any);
  return Array.from(cart.entries())
    .map(([id, quantity]): CartItem | null => {
      const product = products.items.find(p => p.id === id);
      return product ? {...product, cartQuantity: quantity} : null;
    })
    .filter((item): item is CartItem => item !== null);
});

/**
 * Selector para calcular el total del carrito.
 * Suma el precio de cada producto multiplicado por su cantidad en el carrito.
 * @returns El total del carrito como un número.
 */
export const selectCartTotal = createSelector([selectProducts], products => {
  const cart = deserializeMap(products.cartItems as any);
  return Array.from(cart.entries()).reduce((total, [id, quantity]) => {
    const product = products.items.find(p => p.id === id);
    return total + (product ? product.price * quantity : 0);
  }, 0);
});

/**
 * Selector para calcular la cantidad total de productos en el carrito.
 * Suma todas las cantidades de los productos en el carrito.
 * @returns La cantidad total de productos en el carrito.
 */
export const selectCartItemCount = createSelector(
  [selectProducts],
  products => {
    const cart = deserializeMap(products.cartItems as any);
    return Array.from(cart.values()).reduce(
      (sum, quantity) => sum + quantity,
      0,
    );
  },
);

/**
 * Selector para obtener un producto específico del carrito por su ID.
 * @param state - Estado global de Redux.
 * @param id - ID del producto a buscar.
 * @returns El producto con su cantidad en el carrito, o `null` si no está en el carrito.
 */
export const selectCartItemById = createSelector(
  [selectProducts, (_state, id: string) => id],
  (products, id) => {
    const cart = deserializeMap(products.cartItems as any);
    const quantity = cart.get(id) || 0;
    const product = products.items.find(p => p.id === id);
    return product && quantity > 0
      ? {...product, cartQuantity: quantity}
      : null;
  },
);
