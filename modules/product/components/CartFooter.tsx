import React from 'react';
import {View, Pressable, Text, StyleSheet} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';

type CartFooterProps = {
  totalAmount: number;
  onCheckout: () => void;
};

/**
 * `CartFooter` es un componente funcional que representa el pie de página de un carrito de compras.
 * Muestra el monto total del carrito y un botón para proceder al checkout.
 *
 * @component
 *
 * @param {CartFooterProps} props - Las propiedades del componente.
 * @param {number} props.totalAmount - El monto total del carrito.
 * @param {() => void} props.onCheckout - Función que se ejecuta cuando el usuario presiona el botón de checkout.
 *
 * @example
 * ```tsx
 * import React from 'react';
 * import {CartFooter} from './CartFooter';
 *
 * const App = () => {
 *   const handleCheckout = () => {
 *     console.log('Navegar al checkout');
 *   };
 *
 *   return <CartFooter totalAmount={123.45} onCheckout={handleCheckout} />;
 * };
 *
 * export default App;
 * ```
 *
 * @returns {JSX.Element} El componente del pie de página del carrito de compras.
 */
export const CartFooter: React.FC<CartFooterProps> = ({
  totalAmount,
  onCheckout,
}): JSX.Element => (
  <View style={styles.footer}>
    <View style={styles.totalContainer}>
      <Text style={styles.totalLabel}>Total:</Text>
      <Text style={styles.totalAmount}>$ {totalAmount.toFixed(2)}</Text>
    </View>
    <Pressable style={styles.checkoutButton} onPress={onCheckout}>
      <Text style={styles.checkoutButtonText}>Continuar al Checkout</Text>
      <Icon name="arrow-forward" size={20} color="white" />
    </Pressable>
  </View>
);

const styles = StyleSheet.create({
  footer: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    backgroundColor: 'white',
    padding: 16,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: -4,
    },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 8,
  },
  totalContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 16,
  },
  totalLabel: {
    fontSize: 16,
    color: '#666',
  },
  totalAmount: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#333',
  },
  checkoutButton: {
    backgroundColor: '#2196F3',
    borderRadius: 25,
    paddingVertical: 12,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
  checkoutButtonText: {
    color: 'white',
    fontSize: 16,
    fontWeight: '600',
    marginRight: 8,
  },
  emptyState: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingVertical: 40,
  },
  emptyStateText: {
    fontSize: 16,
    color: '#666',
    marginTop: 16,
    marginBottom: 24,
  },
  continueShoppingLink: {
    padding: 12,
  },
  continueShoppingText: {
    color: '#2196F3',
    fontSize: 16,
    fontWeight: '600',
  },
});
