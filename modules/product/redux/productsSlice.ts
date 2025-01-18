import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { Product, ProductsState } from '../data/models/product';
import { sampleProducts } from '../data/sampleProducts';

/**
 * Estado inicial del slice de productos.
 */
const initialState: ProductsState = {
  items: sampleProducts, // Lista de productos disponibles
  cartItems: new Map<string, number>(), // Mapa de productos en el carrito (id del producto, cantidad)
};

/**
 * Serializa un `Map` en un objeto plano.
 *
 * @param {Map<string, number>} map - Mapa de productos en el carrito.
 * @returns {{ [key: string]: number }} - Objeto plano equivalente al mapa.
 */
const serializeMap = (map: Map<string, number>) => {
  return Object.fromEntries(map);
};

/**
 * Deserializa un objeto plano en un `Map`.
 *
 * @param {{ [key: string]: number }} obj - Objeto plano con productos del carrito.
 * @returns {Map<string, number>} - Mapa equivalente al objeto.
 */
const deserializeMap = (obj: { [key: string]: number }) => {
  return new Map(Object.entries(obj));
};

/**
 * Slice de Redux para manejar la lógica de productos y carrito.
 */
const productsSlice = createSlice({
  name: 'products',
  initialState,
  reducers: {
    /**
     * Agrega un producto al carrito.
     *
     * @param {ProductsState} state - Estado actual.
     * @param {PayloadAction<string>} action - ID del producto a agregar.
     */
    addToCart: (state, action: PayloadAction<string>) => {
      const productId = action.payload;
      const productIndex = state.items.findIndex(p => p.id === productId);
      const cart = deserializeMap(state.cartItems as any);

      if (productIndex !== -1) {
        const product = state.items[productIndex];
        const currentInCart = cart.get(productId) || 0;

        if (product.quantity > 0) {
          cart.set(productId, currentInCart + 1);

          state.items[productIndex].quantity -= 1;
          state.cartItems = serializeMap(cart) as any;
        }
      }
    },

    /**
     * Actualiza la cantidad de un producto en el carrito.
     *
     * @param {ProductsState} state - Estado actual.
     * @param {PayloadAction<{id: string; quantity: number}>} action - ID del producto y nueva cantidad.
     */
    updateCartQuantity: (
      state,
      action: PayloadAction<{ id: string; quantity: number }>,
    ) => {
      const { id, quantity } = action.payload;
      const productIndex = state.items.findIndex(p => p.id === id);
      const cart = deserializeMap(state.cartItems as any);

      if (productIndex !== -1) {
        const currentInCart = cart.get(id) || 0;
        const product = state.items[productIndex];
        const quantityDiff = quantity - currentInCart;

        if (
          (quantityDiff > 0 && product.quantity >= quantityDiff) ||
          quantityDiff < 0
        ) {
          cart.set(id, quantity);
          state.items[productIndex].quantity -= quantityDiff;
          state.cartItems = serializeMap(cart) as any;
        }
      }
    },

    /**
     * Elimina un producto del carrito.
     *
     * @param {ProductsState} state - Estado actual.
     * @param {PayloadAction<string>} action - ID del producto a eliminar.
     */
    removeFromCart: (state, action: PayloadAction<string>) => {
      const productId = action.payload;
      const productIndex = state.items.findIndex(p => p.id === productId);
      const cart = deserializeMap(state.cartItems as any);

      if (productIndex !== -1) {
        const currentInCart = cart.get(productId) || 0;

        state.items[productIndex].quantity += currentInCart;
        cart.delete(productId);
        state.cartItems = serializeMap(cart) as any;
      }
    },

    /**
     * Actualiza la cantidad disponible de un producto.
     *
     * @param {ProductsState} state - Estado actual.
     * @param {PayloadAction<{id: string; quantity: number}>} action - ID del producto y nueva cantidad.
     */
    updateQuantity: (
      state,
      action: PayloadAction<{ id: string; quantity: number }>,
    ) => {
      const { id, quantity } = action.payload;
      const productIndex = state.items.findIndex(p => p.id === id);
      const cart = deserializeMap(state.cartItems as any);

      if (productIndex !== -1) {
        const cartQuantity = cart.get(id) || 0;
        if (quantity < cartQuantity) {
          cart.set(id, quantity);
        }
        state.items[productIndex].quantity = quantity;
        state.cartItems = serializeMap(cart) as any;
      }
    },

    /**
     * Agrega un nuevo producto a la lista de productos disponibles.
     *
     * @param {ProductsState} state - Estado actual.
     * @param {PayloadAction<Product>} action - Producto a agregar.
     */
    addProduct: (state, action: PayloadAction<Product>) => {
      state.items.push(action.payload);
    },

    /**
     * Elimina un producto de la lista de productos disponibles.
     *
     * @param {ProductsState} state - Estado actual.
     * @param {PayloadAction<string>} action - ID del producto a eliminar.
     */
    removeProduct: (state, action: PayloadAction<string>) => {
      state.items = state.items.filter(item => item.id !== action.payload);
      const cart = deserializeMap(state.cartItems as any);
      cart.delete(action.payload);
      state.cartItems = serializeMap(cart) as any;
    },

    /**
     * Limpia completamente el carrito, devolviendo las cantidades al inventario.
     *
     * @param {ProductsState} state - Estado actual.
     */
    clearCart: (state) => {
      const cart = deserializeMap(state.cartItems as any);

      Array.from(cart.entries()).forEach(([id, quantity]) => {
        const productIndex = state.items.findIndex(p => p.id === id);
        if (productIndex !== -1) {
          state.items[productIndex].quantity += quantity;
        }
      });

      state.cartItems = serializeMap(new Map()) as any;
    },
  },
});

export const {
  addToCart,
  updateCartQuantity,
  removeFromCart,
  updateQuantity,
  addProduct,
  removeProduct,
  clearCart,
} = productsSlice.actions;

export default productsSlice.reducer;
