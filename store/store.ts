import {configureStore} from '@reduxjs/toolkit';
import {enableMapSet} from 'immer';
import productsReducer from '../modules/product/redux/productsSlice';
import paymentReducer from '../modules/payment/redux/paymentSlice';

// Habilita soporte para estructuras de datos `Map` y `Set` en `immer`.
// Esto permite usar `Map` y `Set` como parte del estado de Redux.
enableMapSet();

/**
 * Configuración de la store de Redux.
 *
 * Define los reducers principales utilizados en la aplicación, permitiendo manejar
 * los estados de `products` y `payment`. Cada reducer está asociado a un módulo específico.
 */
export const store = configureStore({
  reducer: {
    // Reducer para manejar el estado relacionado con productos.
    products: productsReducer,

    // Reducer para manejar el estado relacionado con pagos.
    payment: paymentReducer,
  },
});

/**
 * Tipo derivado del estado raíz de la aplicación.
 * Este tipo representa la estructura completa del estado gestionado por Redux.
 */
export type RootState = ReturnType<typeof store.getState>;

/**
 * Tipo para el despachador de acciones de Redux.
 * Este tipo se utiliza para proporcionar soporte tipado a funciones que despachan acciones.
 */
export type AppDispatch = typeof store.dispatch;
