import React from 'react';
import {
  View,
  Text,
  Button,
  StyleSheet,
  Alert,
  ActivityIndicator,
} from 'react-native';
import {useDispatch, useSelector} from 'react-redux';
import {RootState} from '../../../store/store';
import {setTransactionError, setTransactionStatus} from '../redux/paymentSlice';
import {fakePaymentAPI} from '../services/paymentAPI';
import {useNavigation} from '@react-navigation/native';
import {NavigationProp} from '../../../App';

interface PaymentSummaryModalContentProps {
  onClose: () => void;
}

/**
 * `PaymentSummaryModalContent` es un componente funcional que muestra un resumen de los detalles del pago.
 * Permite al usuario confirmar o cancelar el pago y procesa la transacción mediante una API simulada.
 *
 * @component
 *
 * @example
 * ```tsx
 * import React from 'react';
 * import PaymentSummaryModalContent from './PaymentSummaryModalContent';
 *
 * const App = () => {
 *   const handleClose = () => console.log('Modal cerrado');
 *   return <PaymentSummaryModalContent onClose={handleClose} />;
 * };
 *
 * export default App;
 * ```
 *
 * @param {Object} props - Props del componente.
 * @param {function} props.onClose - Función que se ejecuta al cerrar el modal.
 *
 * @returns {JSX.Element} Componente que renderiza el resumen de pago y opciones para procesarlo.
 */
const PaymentSummaryModalContent: React.FC<PaymentSummaryModalContentProps> = ({
  onClose,
}) => {
  const navigation = useNavigation<NavigationProp>();
  const dispatch = useDispatch();
  const {paymentInfo, transactionStatus} = useSelector(
    (state: RootState) => state.payment,
  );

  /**
   * Maneja la lógica para procesar el pago. Valida si hay información de pago disponible
   * y utiliza una API simulada para completar la transacción.
   */
  const handlePayment = async () => {
    if (!paymentInfo) {
      Alert.alert('Error', 'Faltan datos de pago');
      return;
    }

    dispatch(setTransactionStatus('loading'));
    try {
      await fakePaymentAPI(paymentInfo);
      dispatch(setTransactionStatus('success'));
      dispatch(setTransactionError(null));
      onClose();
      navigation.navigate('/finalStatus');
    } catch (error) {
      dispatch(setTransactionStatus('error'));
      dispatch(setTransactionError('Pago rechazado. Verifica tus datos.'));
    }
  };

  /**
   * Renderiza un indicador de carga si el estado de la transacción es "loading".
   */
  if (transactionStatus === 'loading') {
    return (
      <View style={[styles.container, styles.center]}>
        <ActivityIndicator size="large" color="#0000ff" />
        <Text>Procesando tu pago...</Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Resumen de Pago</Text>
      <Text>
        Número de Tarjeta: **** **** **** {paymentInfo?.cardNumber.slice(-4)}
      </Text>
      <Text style={styles.marginBottom20}>
        Titular: {paymentInfo?.cardHolder}
      </Text>
      <Button title="Pagar" onPress={handlePayment} />
      <View style={styles.marginBottom5} />
      <Button title="Cancelar" onPress={onClose} color="#999" />
    </View>
  );
};

export default PaymentSummaryModalContent;

const styles = StyleSheet.create({
  container: {
    padding: 16,
  },
  title: {
    fontSize: 20,
    marginBottom: 16,
  },
  marginBottom5: {
    marginBottom: 5,
  },
  marginBottom20: {
    marginBottom: 20,
  },
  center: {
    justifyContent: 'center',
    alignItems: 'center',
  },
});
