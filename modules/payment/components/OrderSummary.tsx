import React from 'react';
import {StyleSheet, Text, View} from 'react-native';

/**
 * `OrderSummary` es un componente funcional que muestra un resumen de una orden,
 * incluyendo el subtotal, el costo de envío (si aplica) y el total final.
 *
 * @component
 *
 * @example
 * ```tsx
 * import React from 'react';
 * import { OrderSummary } from './OrderSummary';
 *
 * const App = () => {
 *   return <OrderSummary totalAmount={150.75} />;
 * };
 *
 * export default App;
 * ```
 *
 * @param {Object} props - Props del componente.
 * @param {number} props.totalAmount - El monto total de la orden, incluyendo los productos y cualquier otro cargo.
 *
 * @returns {JSX.Element} Un componente que renderiza un resumen detallado de la orden.
 */
export const OrderSummary: React.FC<{totalAmount: number}> = ({
  totalAmount,
}) => (
  <View style={styles.section}>
    <Text style={styles.sectionTitle}>Resumen de la Orden</Text>

    <View style={styles.orderSummary}>
      <View style={styles.summaryRow}>
        <Text style={styles.summaryLabel}>Subtotal</Text>
        <Text style={styles.summaryValue}>$ {totalAmount.toFixed(2)}</Text>
      </View>

      <View style={styles.summaryRow}>
        <Text style={styles.summaryLabel}>Envío</Text>
        <Text style={styles.summaryValue}>$ 0.00</Text>
      </View>

      <View style={[styles.summaryRow, styles.totalRow]}>
        <Text style={styles.totalLabel}>Total</Text>
        <Text style={styles.totalValue}>$ {totalAmount.toFixed(2)}</Text>
      </View>
    </View>
  </View>
);

const styles = StyleSheet.create({
  section: {
    marginTop: 16,
    backgroundColor: 'white',
    padding: 16,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: '#333',
    marginBottom: 16,
  },
  orderSummary: {
    backgroundColor: '#f8f8f8',
    padding: 16,
    borderRadius: 8,
  },
  summaryRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 8,
  },
  summaryLabel: {
    fontSize: 16,
    color: '#666',
  },
  summaryValue: {
    fontSize: 16,
    color: '#333',
    fontWeight: '500',
  },
  totalRow: {
    marginTop: 8,
    paddingTop: 8,
    borderTopWidth: 1,
    borderTopColor: '#eee',
  },
  totalLabel: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#333',
  },
  totalValue: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#2196F3',
  },
});
