import React from 'react';
import {View, Text, StyleSheet} from 'react-native';

type CartHeaderProps = {
  itemCount: number;
};

/**
 * `CartHeader` es un componente funcional que representa el encabezado del carrito de compras.
 * Muestra un título y el número total de artículos en el carrito.
 *
 * @component
 *
 * @param {CartHeaderProps} props - Las propiedades del componente.
 * @param {number} props.itemCount - Número total de artículos en el carrito.
 *
 * @example
 * ```tsx
 * import React from 'react';
 * import {CartHeader} from './CartHeader';
 *
 * const App = () => {
 *   return <CartHeader itemCount={3} />;
 * };
 *
 * export default App;
 * ```
 *
 * @returns {JSX.Element} El componente del encabezado del carrito de compras.
 */
export const CartHeader: React.FC<CartHeaderProps> = ({
  itemCount,
}): JSX.Element => (
  <View style={styles.header}>
    <Text style={styles.headerTitle}>Carrito de Compras</Text>
    <Text style={styles.itemCount}>
      {itemCount} {itemCount === 1 ? 'item' : 'items'}
    </Text>
  </View>
);

const styles = StyleSheet.create({
  header: {
    padding: 16,
    backgroundColor: 'white',
    borderBottomWidth: 1,
    borderBottomColor: '#eee',
  },
  headerTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#333',
  },
  itemCount: {
    fontSize: 14,
    color: '#666',
    marginTop: 4,
  },
});
