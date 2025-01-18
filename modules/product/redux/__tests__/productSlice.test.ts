import {describe, it, expect} from '@jest/globals';
import {enableMapSet} from 'immer';
import {Product, ProductsState} from '../../data/models/product';
import reducer, {
  addProduct,
  addToCart,
  clearCart,
  removeFromCart,
  removeProduct,
  updateCartQuantity,
  updateQuantity,
} from '../productsSlice';

// Habilitar el plugin MapSet de Immer
enableMapSet();

describe('products reducer', () => {
  const sampleProduct: Product = {
    id: '1', // OJO: Este ID debe existir también en el slice (o sampleProducts)
    name: 'Test Product',
    price: 100,
    quantity: 10,
  };

  const createState = (
    items: Product[],
    cartEntries: [string, number][] = [],
  ): ProductsState => ({
    items,
    cartItems: new Map(cartEntries),
  });

  const initialState = createState([sampleProduct]);

  const getCartValue = (state: any, key: string): number | undefined => {
    if (!state.cartItems) {
      return undefined;
    }
    return (
      state.cartItems instanceof Map
        ? state.cartItems
        : new Map(Object.entries(state.cartItems))
    ).get(key);
  };

  const getCartSize = (state: any): number => {
    if (!state.cartItems) {
      return 0;
    }
    return state.cartItems instanceof Map
      ? state.cartItems.size
      : new Map(Object.entries(state.cartItems)).size;
  };

  const hasCartItem = (state: any, key: string): boolean => {
    if (!state.cartItems) {
      return false;
    }
    return (
      state.cartItems instanceof Map
        ? state.cartItems
        : new Map(Object.entries(state.cartItems))
    ).has(key);
  };

  it('should handle initial state', () => {
    const state = reducer(undefined, {type: 'unknown'});
    expect(state.items).toBeInstanceOf(Array);
    expect(state.cartItems).toBeInstanceOf(Map);
    expect(getCartSize(state)).toBe(0);
  });

  describe('addToCart', () => {
    it('should add a product to cart and decrease available quantity', () => {
      const actual = reducer(initialState, addToCart('1'));

      expect(actual.items[0].quantity).toBe(9);
      expect(getCartValue(actual, '1')).toBe(1);
      expect(getCartSize(actual)).toBe(1);
    });

    it('should not add product if quantity is 0', () => {
      const stateWithNoStock = createState([{...sampleProduct, quantity: 0}]);

      const actual = reducer(stateWithNoStock, addToCart('1'));

      expect(actual.items[0].quantity).toBe(0);
      expect(getCartSize(actual)).toBe(0);
    });
  });

  describe('updateCartQuantity', () => {
    it('should update cart quantity when increasing', () => {
      const stateWithCart = createState(
        [{...sampleProduct, quantity: 9}],
        [['1', 1]],
      );

      const actual = reducer(
        stateWithCart,
        updateCartQuantity({id: '1', quantity: 3}),
      );

      expect(actual.items[0].quantity).toBe(6);
      expect(getCartValue(actual, '1')).toBe(3);
    });

    it('should update cart quantity when decreasing', () => {
      const stateWithCart = createState(
        [{...sampleProduct, quantity: 7}],
        [['1', 3]],
      );

      const actual = reducer(
        stateWithCart,
        updateCartQuantity({id: '1', quantity: 1}),
      );

      expect(actual.items[0].quantity).toBe(6);
      expect(getCartValue(actual, '1')).toBe(1);
    });

    it('should not update if requested quantity exceeds stock', () => {
      const stateWithCart = createState(
        [{...sampleProduct, quantity: 1}],
        [['1', 1]],
      );

      const actual = reducer(
        stateWithCart,
        updateCartQuantity({id: '1', quantity: 3}),
      );

      expect(actual.items[0].quantity).toBe(1);
      expect(getCartValue(actual, '1')).toBe(1);
    });
  });

  describe('removeFromCart', () => {
    it('should remove product from cart and restore quantity', () => {
      const stateWithCart = createState(
        [{...sampleProduct, quantity: 8}],
        [['1', 2]],
      );

      const actual = reducer(stateWithCart, removeFromCart('1'));

      expect(actual.items[0].quantity).toBe(8);
      expect(hasCartItem(actual, '1')).toBe(false);
      expect(getCartSize(actual)).toBe(0);
    });
  });

  describe('updateQuantity', () => {
    it('should update product quantity', () => {
      const actual = reducer(
        initialState,
        updateQuantity({id: '1', quantity: 15}),
      );

      expect(actual.items[0].quantity).toBe(15);
    });
  });

  describe('addProduct', () => {
    it('should add a new product to items', () => {
      const newProduct: Product = {
        id: '2',
        name: 'New Product',
        price: 200,
        quantity: 5,
      };

      const actual = reducer(initialState, addProduct(newProduct));

      expect(actual.items).toHaveLength(2);
      expect(actual.items[1]).toEqual(newProduct);
    });
  });

  describe('removeProduct', () => {
    it('should remove product from items and cart', () => {
      const stateWithCart = createState([sampleProduct], [['1', 2]]);

      const actual = reducer(stateWithCart, removeProduct('1'));

      expect(actual.items).toHaveLength(0);
      expect(hasCartItem(actual, '1')).toBe(false);
      expect(getCartSize(actual)).toBe(0);
    });
  });

  describe('clearCart', () => {
    it('should clear cart and restore quantities', () => {
      const stateWithCart = createState(
        [{...sampleProduct, quantity: 8}],
        [['1', 2]],
      );

      const actual = reducer(stateWithCart, clearCart());

      expect(actual.items[0].quantity).toBe(8);
      expect(getCartSize(actual)).toBe(0);
    });
  });
});
