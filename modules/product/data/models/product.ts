/**
 * Interfaz para representar un producto.
 */
export interface Product {
  id: string;
  name: string;
  price: number;
  quantity: number;
  image?: string;
}

export interface CartItem extends Product {
  cartQuantity: number;
}

/**
 * Estado de productos que se manejará en el store.
 */
export interface ProductsState {
  items: Product[];
  cartItems: Map<string, number>;
}
