import React from 'react';
import {Modal, View, Text, Pressable, StyleSheet} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';

/**
 * `CustomModal` es un componente reutilizable para mostrar un modal personalizado.
 * Ofrece una estructura básica con un encabezado, contenido y un botón para cerrar.
 *
 * @component
 *
 * @example
 * ```tsx
 * import React, { useState } from 'react';
 * import { View, Button, Text } from 'react-native';
 * import { CustomModal } from './CustomModal';
 *
 * const App = () => {
 *   const [modalVisible, setModalVisible] = useState(false);
 *
 *   return (
 *     <View>
 *       <Button title="Mostrar Modal" onPress={() => setModalVisible(true)} />
 *       <CustomModal
 *         visible={modalVisible}
 *         onClose={() => setModalVisible(false)}
 *         title="Modal Título">
 *         <Text>Este es el contenido del modal</Text>
 *       </CustomModal>
 *     </View>
 *   );
 * };
 *
 * export default App;
 * ```
 *
 * @param {Object} props - Props del componente.
 * @param {boolean} props.visible - Indica si el modal está visible o no.
 * @param {() => void} props.onClose - Función que se ejecuta al cerrar el modal.
 * @param {string} props.title - Título del modal.
 * @param {React.ReactNode} props.children - Contenido del modal.
 *
 * @returns {JSX.Element} Un modal personalizado.
 */
export const CustomModal: React.FC<{
  visible: boolean;
  onClose: () => void;
  title: string;
  children: React.ReactNode;
}> = ({visible, onClose, title, children}) => {
  return (
    <Modal
      visible={visible}
      transparent={true}
      animationType="fade"
      onRequestClose={onClose}>
      <View style={styles.overlay}>
        <View style={styles.container}>
          {/* Encabezado del modal */}
          <View style={styles.header}>
            <Text style={styles.title}>{title}</Text>
            <Pressable onPress={onClose}>
              <Icon name="close" size={24} color="#333" />
            </Pressable>
          </View>
          {/* Contenido del modal */}
          <View style={styles.content}>{children}</View>
        </View>
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  overlay: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  container: {
    width: '80%',
    backgroundColor: 'white',
    borderRadius: 10,
    elevation: 5,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 15,
    borderBottomWidth: 1,
    borderBottomColor: '#eee',
  },
  title: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  content: {
    padding: 15,
  },
});
