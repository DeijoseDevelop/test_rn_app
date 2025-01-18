import React from 'react';
import {View, Text, Image, FlatList, StyleSheet, Pressable} from 'react-native';
import {useSelector, useDispatch} from 'react-redux';
import {addToCart} from '../redux/productsSlice';
import {RootState} from '../../../store/store';
import {SafeAreaView} from 'react-native-safe-area-context';

/**
 * `HomeProductsPage` es un componente funcional que representa una página de productos.
 * Se utiliza para listar los productos disponibles en la tienda y permitir al usuario agregar
 * productos al carrito.
 *
 * Este componente utiliza `FlatList` para renderizar dinámicamente una lista de productos,
 * permitiendo scroll y una interfaz optimizada para dispositivos móviles.
 *
 * @component
 *
 * @example
 * ```tsx
 * import React from 'react';
 * import HomeProductsPage from './HomeProductsPage';
 *
 * const App = () => {
 *   return <HomeProductsPage />;
 * };
 *
 * export default App;
 * ```
 */
const HomeProductsPage: React.FC = () => {
  const dispatch = useDispatch();
  const products = useSelector((state: RootState) => state.products.items);

  /**
   * Maneja el evento de agregar un producto al carrito.
   *
   * @param {string} productId - ID del producto que se va a agregar al carrito.
   */
  const handleAddToCart = (productId: string) => {
    dispatch(addToCart(productId));
  };

  return (
    <SafeAreaView style={styles.safeArea}>
      <View style={styles.container}>
        <FlatList
          data={products}
          keyExtractor={item => item.id}
          showsVerticalScrollIndicator={false}
          contentContainerStyle={styles.listContainer}
          renderItem={({item}) => (
            <Pressable style={styles.productCard}>
              <Image
                source={{uri: item.image}}
                style={styles.productImage}
                resizeMode="cover"
              />
              <View style={styles.productInfo}>
                <Text style={styles.productName}>{item.name}</Text>
                <Text style={styles.productPrice}>
                  $ {item.price.toFixed(2)}
                </Text>
                <View style={styles.actionContainer}>
                  <Text style={styles.stockText}>
                    {item.quantity > 0 ? 'En stock' : 'Agotado'}
                  </Text>
                  <Pressable
                    style={[
                      styles.addButton,
                      item.quantity === 0 && styles.disabledButton,
                    ]}
                    disabled={item.quantity === 0}
                    onPress={() => {
                      console.log(item.quantity);
                      handleAddToCart(item.id);
                    }}>
                    <Text style={styles.addButtonText}>Agregar</Text>
                  </Pressable>
                </View>
              </View>
            </Pressable>
          )}
        />
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: '#f5f5f5',
  },
  container: {
    flex: 1,
    backgroundColor: '#f5f5f5',
  },
  listContainer: {
    padding: 16,
    paddingBottom: 80,
  },
  productCard: {
    backgroundColor: 'white',
    borderRadius: 12,
    marginBottom: 16,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  productImage: {
    width: '100%',
    height: 200,
    borderTopLeftRadius: 12,
    borderTopRightRadius: 12,
    backgroundColor: '#f0f0f0',
  },
  productInfo: {
    padding: 16,
  },
  productName: {
    fontSize: 18,
    fontWeight: '600',
    color: '#333',
    marginBottom: 8,
  },
  productPrice: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#2196F3',
    marginBottom: 12,
  },
  actionContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  stockText: {
    color: '#4CAF50',
    fontSize: 14,
    fontWeight: '500',
  },
  addButton: {
    backgroundColor: '#2196F3',
    paddingHorizontal: 20,
    paddingVertical: 8,
    borderRadius: 20,
  },
  disabledButton: {
    backgroundColor: '#cccccc',
  },
  addButtonText: {
    color: 'white',
    fontWeight: '600',
  },
});

export default HomeProductsPage;
