import React, {useState, useCallback} from 'react';
import {Text, View, ScrollView, SafeAreaView, StyleSheet} from 'react-native';
import {useSelector} from 'react-redux';
import {selectCartTotal} from '../../product/redux/productsSelectors';
import CreditCardForm from '../components/forms/CreditCardForm';
import PaymentSummaryModalContent from '../components/PaymentSummaryModalContent';
import {OrderSummary} from '../components/OrderSummary';
import {PaymentMethodItem} from '../components/PaymentMethodItem';
import {CustomModal} from '../components/CustomModal';

/**
 * `CheckoutPage` es un componente funcional que representa la pantalla de pago.
 * Incluye un resumen del pedido, métodos de pago disponibles y formularios para procesar pagos.
 *
 * @component
 *
 * @example
 * ```tsx
 * import React from 'react';
 * import CheckoutPage from './CheckoutPage';
 *
 * const App = () => {
 *   return <CheckoutPage />;
 * };
 *
 * export default App;
 * ```
 *
 * @returns {JSX.Element} Componente que renderiza la página de pago.
 */
const CheckoutPage: React.FC = () => {
  const [showCardModal, setShowCardModal] = useState(false);
  const [showSummaryModal, setShowSummaryModal] = useState(false);
  const totalAmount = useSelector(selectCartTotal);

  /**
   * Muestra el modal para pagar con tarjeta de crédito o débito.
   */
  const handlePayWithCard = useCallback(() => {
    console.log('Estado actual del modal:', showCardModal);
    console.log('Intentando abrir modal...');
    setTimeout(() => {
      setShowCardModal(true);
    }, 100);
    console.log('Nuevo estado del modal:', showCardModal);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  /**
   * Cierra el modal de tarjeta de crédito y abre el resumen de pago.
   */
  const handleCloseCardModal = useCallback(() => {
    setShowCardModal(false);
    setShowSummaryModal(true);
  }, []);

  /**
   * Cierra el modal de resumen de pago.
   */
  const handleCloseSummaryModal = useCallback(() => {
    setShowSummaryModal(false);
  }, []);

  const paymentMethods = [
    {
      id: 'credit',
      title: 'Tarjeta de Crédito',
      icon: 'credit-card',
      description: 'Paga de forma segura con tu tarjeta',
    },
    {
      id: 'debit',
      title: 'Tarjeta de Débito',
      icon: 'payment',
      description: 'Usa tu tarjeta de débito',
    },
  ];

  return (
    <SafeAreaView style={styles.safeArea}>
      <ScrollView style={styles.container}>
        <OrderSummary totalAmount={totalAmount} />

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Método de Pago</Text>
          {paymentMethods.map(method => (
            <PaymentMethodItem
              key={method.id}
              {...method}
              onPress={() => {
                console.log('Botón presionado');
                handlePayWithCard();
              }}
            />
          ))}
        </View>
      </ScrollView>

      <CustomModal
        visible={showCardModal}
        onClose={() => setShowCardModal(false)}
        title="Pago con Tarjeta">
        <CreditCardForm
          handleAction={handleCloseCardModal}
          onClose={() => setShowCardModal(false)}
        />
      </CustomModal>

      <CustomModal
        visible={showSummaryModal}
        onClose={handleCloseSummaryModal}
        title="Resumen de Pago">
        <PaymentSummaryModalContent onClose={handleCloseSummaryModal} />
      </CustomModal>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: '#f5f5f5',
  },
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
  container: {
    flex: 1,
  },
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
});

export default CheckoutPage;
