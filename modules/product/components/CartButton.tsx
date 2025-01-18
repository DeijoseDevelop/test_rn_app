import React from 'react';
import {View, Text, TouchableOpacity, StyleSheet} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';
import {useSelector} from 'react-redux';
import {selectCartItemCount} from '../redux/productsSelectors';
import {useNavigation} from '@react-navigation/native';
import {NavigationProp} from '../../../App';

/**
 * `CartButton` es un componente funcional que representa un botón para acceder al carrito de compras.
 * Muestra un ícono de carrito junto con un indicador del número de productos en el carrito.
 * Si el carrito contiene elementos, el número se muestra como un badge sobre el ícono.
 *
 * @component
 *
 * @example
 * ```tsx
 * import React from 'react';
 * import CartButton from './CartButton';
 *
 * const App = () => {
 *   return <CartButton />;
 * };
 *
 * export default App;
 * ```
 *
 * @returns {JSX.Element} Botón de acceso al carrito de compras con badge.
 */
const CartButton: React.FC = (): JSX.Element => {
  const navigation = useNavigation<NavigationProp>();
  const cartItemsCount = useSelector(selectCartItemCount);

  /**
   * Navega a la pantalla de productos seleccionados.
   */
  const handlePress = () => {
    navigation.navigate('/selectedProducts');
  };

  return (
    <TouchableOpacity onPress={handlePress} style={styles.cartButton}>
      <Icon name="shopping-cart" size={24} color="black" />
      {cartItemsCount > 0 && (
        <View style={styles.badge}>
          <Text style={styles.badgeText}>{cartItemsCount}</Text>
        </View>
      )}
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  cartButton: {
    padding: 8,
    position: 'relative',
  },
  badge: {
    position: 'absolute',
    right: 0,
    top: 0,
    backgroundColor: 'red',
    borderRadius: 10,
    minWidth: 20,
    height: 20,
    justifyContent: 'center',
    alignItems: 'center',
  },
  badgeText: {
    color: 'white',
    fontSize: 12,
    fontWeight: 'bold',
  },
});

export default CartButton;
