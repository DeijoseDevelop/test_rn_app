import React from 'react';
import {Button, StyleSheet, Text, View} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';

type EmptyCartProps = {
  onContinueShopping: () => void;
};

/**
 * `EmptyCart` es un componente funcional que muestra un mensaje de estado vacío
 * cuando el carrito de compras no contiene productos. También incluye un botón para
 * continuar comprando.
 *
 * @component
 *
 * @param {EmptyCartProps} props - Propiedades del componente.
 * @param {() => void} props.onContinueShopping - Función que se ejecuta cuando el usuario
 * presiona el botón "Continuar Comprando".
 *
 * @example
 * ```tsx
 * import React from 'react';
 * import { EmptyCart } from './EmptyCart';
 *
 * const App = () => {
 *   const handleContinueShopping = () => {
 *     console.log('Continuar comprando');
 *   };
 *
 *   return <EmptyCart onContinueShopping={handleContinueShopping} />;
 * };
 *
 * export default App;
 * ```
 *
 * @returns {JSX.Element} Componente visual para mostrar un carrito vacío.
 */
export const EmptyCart: React.FC<EmptyCartProps> = ({onContinueShopping}) => (
  <View style={styles.emptyState}>
    <Icon name="shopping-cart" size={64} color="#ccc" />
    <Text style={styles.emptyStateText}>No hay productos en el carrito</Text>
    <Button title="Continuar Comprando" onPress={onContinueShopping} />
  </View>
);

const styles = StyleSheet.create({
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
});
