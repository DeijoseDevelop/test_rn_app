import React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {
  createNativeStackNavigator,
  NativeStackNavigationProp,
} from '@react-navigation/native-stack';
import HomeProductsPage from './modules/product/pages/HomeProductsPage';
import {GestureHandlerRootView} from 'react-native-gesture-handler';
import {SafeAreaProvider} from 'react-native-safe-area-context';
import {Provider} from 'react-redux';
import {store} from './store/store';
import {StyleSheet} from 'react-native';
import CartButton from './modules/product/components/CartButton';
import SelectProductPage from './modules/product/pages/SelectedProductsPage';
import CheckoutPage from './modules/payment/pages/CheckoutPage';
import FinalStatusPage from './modules/payment/pages/FinalStatusPage';
import {SplashScreen} from './modules/common/pages/SplashPage';

type RootStackParamList = {
  '/splash': undefined;
  '/products': undefined;
  '/selectedProducts': undefined;
  '/checkout': undefined;
  '/finalStatus': undefined;
};

export type NavigationProp = NativeStackNavigationProp<RootStackParamList>;

const Stack = createNativeStackNavigator<RootStackParamList>();

function App(): React.JSX.Element {
  return (
    <Provider store={store}>
      <SafeAreaProvider>
        <GestureHandlerRootView style={styles.flex1}>
          <NavigationContainer>
            <Stack.Navigator
              initialRouteName="/splash"
              screenOptions={{
                headerStyle: {
                  backgroundColor: 'white',
                },
                headerShadowVisible: true,
                headerTitleStyle: {
                  fontSize: 18,
                  fontWeight: '600',
                },
              }}>
              <Stack.Screen
                name="/splash"
                component={SplashScreen}
                options={{
                  headerShown: false,
                }}
              />
              <Stack.Screen
                name="/products"
                component={HomeProductsPage}
                options={{
                  title: 'Tienda de Productos',
                  headerRight: CartButton,
                }}
              />
              <Stack.Screen
                name="/selectedProducts"
                component={SelectProductPage}
                options={{
                  title: 'Productos seleccionados',
                }}
              />
              <Stack.Screen
                name="/checkout"
                component={CheckoutPage}
                options={{
                  title: 'Checkout',
                }}
              />
              <Stack.Screen
                name="/finalStatus"
                component={FinalStatusPage}
                options={{
                  headerShown: false,
                }}
              />
            </Stack.Navigator>
          </NavigationContainer>
        </GestureHandlerRootView>
      </SafeAreaProvider>
    </Provider>
  );
}

const styles = StyleSheet.create({
  flex1: {
    flex: 1,
  },
});

export default App;
