import React, {useEffect} from 'react';
import {View, Image, StyleSheet, Dimensions} from 'react-native';
import {useNavigation} from '@react-navigation/native';
import {NavigationProp} from '../../../App';

const {width, height} = Dimensions.get('window');

/**
 * `SplashScreen` es un componente funcional que representa una pantalla de introducción o bienvenida.
 * Se utiliza al inicio de la aplicación para mostrar una imagen y realizar una navegación automática
 * después de un breve período de tiempo.
 *
 * @component
 *
 * @example
 * ```tsx
 * import React from 'react';
 * import { SplashScreen } from './SplashScreen';
 *
 * const App = () => {
 *   return <SplashScreen />;
 * };
 *
 * export default App;
 * ```
 *
 * @returns {JSX.Element} Componente que renderiza una pantalla de introducción.
 */
export const SplashScreen: React.FC = (): JSX.Element => {
  const navigation = useNavigation<NavigationProp>();

  /**
   * Efecto que se ejecuta una vez al montar el componente.
   * Establece un temporizador que redirige al usuario a la ruta `/products` después de 3 segundos.
   * También limpia el temporizador si el componente se desmonta antes de que se complete el tiempo.
   */
  useEffect(() => {
    const timer = setTimeout(() => {
      navigation.replace('/products');
    }, 3000);

    return () => clearTimeout(timer);
  }, [navigation]);

  return (
    <View testID="splash-container" style={styles.container}>
      <Image
        source={require('../../../assets/images/splash-icon.png')} // Icono de la pantalla de inicio
        style={styles.image}
        resizeMode="contain"
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFFFFF',
    justifyContent: 'center',
    alignItems: 'center',
  },
  image: {
    width: width * 0.8,
    height: height * 0.8,
  },
});
