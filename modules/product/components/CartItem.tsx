import React from 'react';
import {View, Text, Image, Pressable, StyleSheet} from 'react-native';
import {CartItem as CartItemType} from '../data/models/product';
import Icon from 'react-native-vector-icons/MaterialIcons';

type CartItemProps = {
  item: CartItemType;
  onIncrement: (id: string, quantity: number) => void;
  onDecrement: (id: string, quantity: number) => void;
  onRemove: (id: string) => void;
};

/**
 * `CartItemComponent` es un componente funcional que representa un producto dentro del carrito de compras.
 * Proporciona controles para incrementar, decrementar y eliminar un producto, además de mostrar su información básica.
 *
 * @component
 *
 * @param {CartItemProps} props - Propiedades del componente.
 * @param {CartItemType} props.item - Información del producto en el carrito.
 * @param {(id: string, quantity: number) => void} props.onIncrement - Función para manejar el incremento de la cantidad.
 * @param {(id: string, quantity: number) => void} props.onDecrement - Función para manejar el decremento de la cantidad.
 * @param {(id: string) => void} props.onRemove - Función para manejar la eliminación del producto del carrito.
 *
 * @example
 * ```tsx
 * import React from 'react';
 * import {CartItemComponent} from './CartItemComponent';
 *
 * const App = () => {
 *   const handleIncrement = (id, quantity) => console.log('Incrementar', id, quantity);
 *   const handleDecrement = (id, quantity) => console.log('Decrementar', id, quantity);
 *   const handleRemove = (id) => console.log('Eliminar', id);
 *
 *   return (
 *     <CartItemComponent
 *       item={{
 *         id: '1',
 *         name: 'Producto 1',
 *         price: 10.99,
 *         image: 'https://via.placeholder.com/100',
 *         cartQuantity: 2,
 *       }}
 *       onIncrement={handleIncrement}
 *       onDecrement={handleDecrement}
 *       onRemove={handleRemove}
 *     />
 *   );
 * };
 * export default App;
 * ```
 *
 * @returns {JSX.Element} Componente del elemento del carrito de compras.
 */
export const CartItemComponent: React.FC<CartItemProps> = ({
  item,
  onIncrement,
  onDecrement,
  onRemove,
}) => (
  <View style={styles.cartItem}>
    <Image
      source={{uri: item.image}}
      style={styles.productImage}
      resizeMode="cover"
    />
    <View style={styles.productInfo}>
      <Text style={styles.productName}>{item.name}</Text>
      <Text style={styles.productPrice}>$ {item.price.toFixed(2)}</Text>

      <View style={styles.quantityControls}>
        <Pressable
          style={styles.quantityButton}
          onPress={() => onDecrement(item.id, item.cartQuantity)}>
          <Icon name="remove" size={20} color="#2196F3" />
        </Pressable>

        <Text style={styles.quantityText}>{item.cartQuantity}</Text>

        <Pressable
          style={styles.quantityButton}
          onPress={() => onIncrement(item.id, item.cartQuantity)}>
          <Icon name="add" size={20} color="#2196F3" />
        </Pressable>

        <Pressable
          style={styles.removeButton}
          onPress={() => onRemove(item.id)}>
          <Icon name="delete-outline" size={20} color="#FF5252" />
        </Pressable>
      </View>
    </View>
  </View>
);

const styles = StyleSheet.create({
  cartItem: {
    flexDirection: 'row',
    backgroundColor: 'white',
    borderRadius: 12,
    marginBottom: 16,
    padding: 12,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  productImage: {
    width: 100,
    height: 100,
    borderRadius: 8,
    backgroundColor: '#f0f0f0',
  },
  productInfo: {
    flex: 1,
    marginLeft: 12,
  },
  productName: {
    fontSize: 16,
    fontWeight: '600',
    color: '#333',
    marginBottom: 4,
  },
  productPrice: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#2196F3',
    marginBottom: 12,
  },
  quantityControls: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  quantityButton: {
    width: 32,
    height: 32,
    borderRadius: 16,
    borderWidth: 1,
    borderColor: '#2196F3',
    justifyContent: 'center',
    alignItems: 'center',
    marginHorizontal: 4,
  },
  quantityText: {
    fontSize: 16,
    fontWeight: '600',
    marginHorizontal: 12,
  },
  removeButton: {
    marginLeft: 'auto',
    padding: 4,
  },
});
