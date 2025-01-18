import React from 'react';
import {View, StyleSheet, FlatList} from 'react-native';
import {useSelector, useDispatch} from 'react-redux';
import {updateCartQuantity, removeFromCart} from '../redux/productsSlice';
import {selectCartItems, selectCartTotal} from '../redux/productsSelectors';
import {CartItem} from '../data/models/product';
import {NavigationProp} from '../../../App';
import {useNavigation} from '@react-navigation/native';
import {SafeAreaView} from 'react-native-safe-area-context';
import {CartHeader} from '../components/CartHeader';
import {EmptyCart} from '../components/EmptyCart';
import {CartItemComponent} from '../components/CartItem';
import {CartFooter} from '../components/CartFooter';

/**
 * `SelectProductPage` es un componente funcional que representa la página de selección de productos
 * en el carrito de compras. Permite al usuario gestionar los productos añadidos al carrito,
 * ajustar cantidades, eliminar productos y proceder al pago.
 *
 * Utiliza componentes reutilizables como `CartHeader`, `CartItemComponent`, `CartFooter` y `EmptyCart`
 * para organizar el contenido y proporcionar una experiencia de usuario coherente.
 *
 * @component
 *
 * @example
 * ```tsx
 * import React from 'react';
 * import SelectProductPage from './SelectProductPage';
 *
 * const App = () => {
 *   return <SelectProductPage />;
 * };
 *
 * export default App;
 * ```
 */
const SelectProductPage: React.FC = () => {
  const navigation = useNavigation<NavigationProp>();
  const dispatch = useDispatch();
  const cartItems = useSelector(selectCartItems) as CartItem[];
  const totalAmount = useSelector(selectCartTotal);

  /**
   * Maneja el incremento de la cantidad de un producto en el carrito.
   *
   * @param {string} productId - ID del producto a incrementar.
   * @param {number} currentQuantity - Cantidad actual del producto.
   */
  const handleIncrement = (productId: string, currentQuantity: number) => {
    dispatch(
      updateCartQuantity({id: productId, quantity: currentQuantity + 1}),
    );
  };

  /**
   * Maneja el decremento de la cantidad de un producto en el carrito.
   * Si la cantidad llega a 1 y se intenta reducir, el producto se elimina.
   *
   * @param {string} productId - ID del producto a decrementar.
   * @param {number} currentQuantity - Cantidad actual del producto.
   */
  const handleDecrement = (productId: string, currentQuantity: number) => {
    if (currentQuantity > 1) {
      dispatch(
        updateCartQuantity({id: productId, quantity: currentQuantity - 1}),
      );
    } else {
      dispatch(removeFromCart(productId));
    }
  };

  /**
   * Maneja la eliminación de un producto del carrito.
   *
   * @param {string} productId - ID del producto a eliminar.
   */
  const handleRemove = (productId: string) => {
    dispatch(removeFromCart(productId));
  };

  /**
   * Navega a la página de checkout.
   */
  const handleCheckout = () => {
    navigation.navigate('/checkout');
  };

  return (
    <SafeAreaView style={styles.safeArea}>
      <View style={styles.container}>
        <CartHeader itemCount={cartItems.length} />

        <FlatList
          data={cartItems}
          keyExtractor={item => item.id}
          contentContainerStyle={styles.listContainer}
          ListEmptyComponent={
            <EmptyCart onContinueShopping={() => navigation.goBack()} />
          }
          renderItem={({item}) => (
            <CartItemComponent
              item={item}
              onIncrement={handleIncrement}
              onDecrement={handleDecrement}
              onRemove={handleRemove}
            />
          )}
        />

        {cartItems.length > 0 && (
          <CartFooter totalAmount={totalAmount} onCheckout={handleCheckout} />
        )}
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: '#f5f5f5',
  },
  container: {
    flex: 1,
    backgroundColor: '#f5f5f5',
  },
  listContainer: {
    padding: 16,
    paddingBottom: 100,
  },
});

export default SelectProductPage;
