import React from 'react';
import {View, Text, Pressable, StyleSheet} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';

type PaymentMethodProps = {
  id: string;
  title: string;
  icon: string;
  description: string;
  onPress: () => void;
};

/**
 * `PaymentMethodItem` es un componente funcional que representa un elemento de método de pago.
 * Incluye un icono, un título, una descripción y un botón para interactuar con el método de pago.
 *
 * @component
 *
 * @example
 * ```tsx
 * import React from 'react';
 * import { PaymentMethodItem } from './PaymentMethodItem';
 *
 * const handlePress = () => {
 *   console.log('Método de pago seleccionado');
 * };
 *
 * const App = () => (
 *   <PaymentMethodItem
 *     id="1"
 *     title="Tarjeta de Crédito"
 *     icon="credit-card"
 *     description="Paga con tu tarjeta de crédito o débito"
 *     onPress={handlePress}
 *   />
 * );
 *
 * export default App;
 * ```
 *
 * @param {Object} props - Props del componente.
 * @param {string} props.id - Identificador único del método de pago.
 * @param {string} props.title - Título del método de pago.
 * @param {string} props.icon - Nombre del icono que representa el método de pago.
 * @param {string} props.description - Descripción del método de pago.
 * @param {function} props.onPress - Función a ejecutar cuando se selecciona el método de pago.
 *
 * @returns {JSX.Element} Componente que renderiza un método de pago.
 */
export const PaymentMethodItem: React.FC<PaymentMethodProps> = ({
  title,
  icon,
  description,
  onPress,
}) => (
  <Pressable style={styles.paymentMethod} onPress={onPress}>
    <View style={styles.paymentIcon}>
      <Icon name={icon as any} size={24} color="#2196F3" />
    </View>

    <View style={styles.paymentInfo}>
      <Text style={styles.paymentTitle}>{title}</Text>
      <Text style={styles.paymentDescription}>{description}</Text>
    </View>

    <Icon name="chevron-right" size={24} color="#999" />
  </Pressable>
);

const styles = StyleSheet.create({
  paymentMethod: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'white',
    padding: 16,
    borderRadius: 8,
    marginBottom: 8,
    borderWidth: 1,
    borderColor: '#eee',
  },
  paymentIcon: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: '#f0f9ff',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 12,
  },
  paymentInfo: {
    flex: 1,
  },
  paymentTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: '#333',
    marginBottom: 4,
  },
  paymentDescription: {
    fontSize: 14,
    color: '#666',
  },
});
