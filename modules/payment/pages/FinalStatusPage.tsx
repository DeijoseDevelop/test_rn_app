import React, {useEffect} from 'react';
import {
  View,
  Text,
  StyleSheet,
  Pressable,
  Animated,
  ActivityIndicator,
} from 'react-native';
import {useSelector, useDispatch} from 'react-redux';
import {RootState} from '../../../store/store';
import {
  clearPaymentInfo,
  setTransactionError,
  setTransactionStatus,
} from '../redux/paymentSlice';
import {clearCart} from '../../product/redux/productsSlice';
import {NavigationProp} from '../../../App';
import {useNavigation} from '@react-navigation/native';
import Icon from 'react-native-vector-icons/MaterialIcons';

/**
 * `FinalStatusPage` es un componente funcional que muestra el estado final de una transacción.
 * Incluye mensajes de éxito, error o carga dependiendo del estado actual de la transacción,
 * y permite al usuario volver a la pantalla principal.
 *
 * @component
 *
 * @example
 * ```tsx
 * import React from 'react';
 * import FinalStatusPage from './FinalStatusPage';
 *
 * const App = () => {
 *   return <FinalStatusPage />;
 * };
 *
 * export default App;
 * ```
 *
 * @returns {JSX.Element} Componente que renderiza la página de estado final de la transacción.
 */
const FinalStatusPage: React.FC = () => {
  const navigation = useNavigation<NavigationProp>();
  const dispatch = useDispatch();
  const {transactionStatus, transactionError} = useSelector(
    (state: RootState) => state.payment,
  );

  const scaleAnim = new Animated.Value(0);
  const opacityAnim = new Animated.Value(0);

  /**
   * Efecto para animar la entrada del componente al montarse.
   */
  useEffect(() => {
    Animated.parallel([
      Animated.spring(scaleAnim, {
        toValue: 1,
        useNativeDriver: true,
        tension: 50,
        friction: 7,
      }),
      Animated.timing(opacityAnim, {
        toValue: 1,
        duration: 500,
        useNativeDriver: true,
      }),
    ]).start();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  /**
   * Maneja el evento de volver a la pantalla principal.
   * Incluye animaciones de salida y reseteo del estado de la transacción.
   */
  const handleGoHome = () => {
    Animated.parallel([
      Animated.timing(opacityAnim, {
        toValue: 0,
        duration: 200,
        useNativeDriver: true,
      }),
      Animated.spring(scaleAnim, {
        toValue: 0,
        useNativeDriver: true,
      }),
    ]).start(() => {
      dispatch(clearPaymentInfo());
      dispatch(setTransactionStatus('idle'));
      dispatch(setTransactionError(null));
      dispatch(clearCart());
      navigation.popToTop();
    });
  };

  /**
   * Renderiza el contenido correspondiente al estado de la transacción.
   *
   * @returns {JSX.Element} Contenido a mostrar según el estado.
   */
  const renderStatusContent = () => {
    switch (transactionStatus) {
      case 'success':
        return (
          <>
            <Icon name="check-circle" size={80} color="#4CAF50" />
            <Text style={styles.success}>¡Transacción Exitosa!</Text>
            <Text style={styles.subtitle}>
              Tu pedido ha sido procesado correctamente
            </Text>
          </>
        );
      case 'error':
        return (
          <>
            <Icon name="error" size={80} color="#FF5252" />
            <Text style={styles.error}>Transacción Fallida</Text>
            <Text style={styles.errorDetail}>{transactionError}</Text>
          </>
        );
      case 'loading':
        return (
          <>
            <ActivityIndicator size="large" color="#2196F3" />
            <Text style={styles.loading}>Procesando transacción...</Text>
          </>
        );
      default:
        return (
          <>
            <Icon name="info" size={80} color="#2196F3" />
            <Text style={styles.info}>No se ha realizado transacción</Text>
          </>
        );
    }
  };

  return (
    <View style={styles.container}>
      <Animated.View
        style={[
          styles.contentContainer,
          {
            transform: [{scale: scaleAnim}],
            opacity: opacityAnim,
          },
        ]}>
        <View style={styles.statusContainer}>{renderStatusContent()}</View>

        <Pressable style={styles.button} onPress={handleGoHome}>
          <Icon name="home" size={24} color="white" style={styles.buttonIcon} />
          <Text style={styles.buttonText}>Volver al Inicio</Text>
        </Pressable>
      </Animated.View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#f5f5f5',
  },
  contentContainer: {
    width: '100%',
    alignItems: 'center',
  },
  statusContainer: {
    backgroundColor: 'white',
    padding: 24,
    borderRadius: 16,
    alignItems: 'center',
    width: '100%',
    marginBottom: 24,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  success: {
    fontSize: 24,
    color: '#4CAF50',
    fontWeight: 'bold',
    marginTop: 16,
    marginBottom: 8,
  },
  error: {
    fontSize: 24,
    color: '#FF5252',
    fontWeight: 'bold',
    marginTop: 16,
    marginBottom: 8,
  },
  errorDetail: {
    fontSize: 16,
    color: '#666',
    textAlign: 'center',
    paddingHorizontal: 20,
  },
  info: {
    fontSize: 20,
    color: '#2196F3',
    fontWeight: '600',
    marginTop: 16,
  },
  loading: {
    fontSize: 18,
    color: '#2196F3',
    marginTop: 16,
  },
  subtitle: {
    fontSize: 16,
    color: '#666',
    textAlign: 'center',
  },
  button: {
    backgroundColor: '#2196F3',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 12,
    paddingHorizontal: 24,
    borderRadius: 25,
    width: '100%',
    elevation: 2,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 4,
  },
  buttonIcon: {
    marginRight: 8,
  },
  buttonText: {
    color: 'white',
    fontSize: 16,
    fontWeight: '600',
  },
});

export default FinalStatusPage;
