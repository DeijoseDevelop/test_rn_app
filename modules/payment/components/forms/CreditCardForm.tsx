import React, { useState, useEffect } from 'react';
import { View, Text, TextInput, Button, StyleSheet, Alert } from 'react-native';
import { useDispatch } from 'react-redux';
import {
  CreditCardFormData,
  validateCreditCardForm,
} from '../../../../schemas/creditCardSchema';
import { formatExpirationDate } from '../../../../utils/formatExpirationDate';
import { formatCardNumber } from '../../../../utils/formatCardNumber';
import { setPaymentInfo } from '../../redux/paymentSlice';
import { getCardType } from '../../../../utils/creditCardValidation';
import { SecureStorageService } from '../../services/storage/secureStorage';

/**
 * Componente `CreditCardForm` para capturar y validar datos de una tarjeta de crédito.
 * Proporciona funcionalidad para la validación en tiempo real, almacenamiento seguro
 * de datos y manejo de errores específicos por campo.
 *
 * @component
 *
 * @example
 * ```tsx
 * import React from 'react';
 * import CreditCardForm from './CreditCardForm';
 *
 * const App = () => {
 *   const handleFormClose = () => console.log('Formulario cerrado');
 *   const handleFormConfirm = () => console.log('Formulario confirmado');
 *
 *   return (
 *     <CreditCardForm
 *       onClose={handleFormClose}
 *       handleAction={handleFormConfirm}
 *     />
 *   );
 * };
 *
 * export default App;
 * ```
 *
 * @param {Object} props - Props del componente.
 * @param {() => void} props.onClose - Función para cerrar el formulario.
 * @param {() => void} props.handleAction - Función que se ejecuta al confirmar el formulario.
 *
 * @returns {JSX.Element} Un formulario para capturar datos de tarjeta de crédito.
 */
const CreditCardForm: React.FC<{
  onClose: () => void;
  handleAction: () => void;
}> = ({ onClose, handleAction }) => {
  const dispatch = useDispatch();
  const [errors, setErrors] = useState<{ [key: string]: string }>({});
  const [formData, setFormData] = useState<CreditCardFormData>({
    cardNumber: '',
    cardHolder: '',
    expDate: '',
    cvv: '',
  });
  const [isLoading, setIsLoading] = useState(true);

  /**
   * Efecto que carga los datos almacenados de la tarjeta de crédito
   * desde `SecureStorageService` cuando el componente se monta.
   */
  useEffect(() => {
    const loadStoredCardData = async () => {
      try {
        const storedData = await SecureStorageService.getPaymentData();
        if (storedData) {
          setFormData({
            cardNumber: storedData.cardNumber,
            cardHolder: storedData.cardHolder,
            expDate: storedData.expDate,
            cvv: '', // Por seguridad, no se almacena ni recupera el CVV
          });
        }
      } catch (error) {
        console.error('Error loading stored card data:', error);
      } finally {
        setIsLoading(false);
      }
    };

    loadStoredCardData();
  }, []);

  /**
   * Maneja los cambios de texto en los campos del formulario.
   * Realiza el formato necesario y actualiza el estado del formulario.
   *
   * @param {keyof CreditCardFormData} field - Campo a actualizar.
   * @returns {(value: string) => void} Función que actualiza el estado.
   */
  const handleChange = (field: keyof CreditCardFormData) => (value: string) => {
    let processedValue = value;

    if (field === 'expDate') {
      processedValue = formatExpirationDate(value);
    }
    if (field === 'cardNumber') {
      processedValue = formatCardNumber(value);
    }
    if (field === 'cvv') {
      processedValue = value.replace(/\D/g, '');
    }
    if (field === 'cardHolder') {
      processedValue = value.toUpperCase();
    }

    setFormData((prev) => ({
      ...prev,
      [field]: processedValue,
    }));

    if (errors[field]) {
      setErrors((prev) => {
        const newErrors = { ...prev };
        delete newErrors[field];
        return newErrors;
      });
    }
  };

  /**
   * Valida el formulario usando el esquema de validación definido
   * y actualiza el estado de errores si hay problemas.
   *
   * @returns {boolean} `true` si el formulario es válido, de lo contrario `false`.
   */
  const validateForm = () => {
    const validation = validateCreditCardForm(formData);

    if (!validation.success) {
      const newErrors: { [key: string]: string } = {};

      if (validation.errors?.fieldErrors) {
        Object.entries(validation.errors.fieldErrors).forEach(
          ([field, errorMessages]) => {
            if (errorMessages && errorMessages[0]) {
              newErrors[field] = errorMessages[0];
            }
          }
        );
      }

      setErrors(newErrors);
      return false;
    }

    setErrors({});
    return true;
  };

  /**
   * Maneja la confirmación del formulario, validando los datos,
   * almacenándolos en Redux y ejecutando la acción proporcionada.
   */
  const handleConfirm = () => {
    if (validateForm()) {
      dispatch(setPaymentInfo(formData));
      handleAction();
    } else {
      Alert.alert('Error', 'Por favor corrige los errores en el formulario');
    }
  };

  /**
   * Limpia los campos del formulario y elimina los datos almacenados en `SecureStorageService`.
   */
  const handleClearForm = () => {
    Alert.alert(
      'Limpiar Formulario',
      '¿Estás seguro de que quieres limpiar todos los campos?',
      [
        {
          text: 'Cancelar',
          style: 'cancel',
        },
        {
          text: 'Limpiar',
          style: 'destructive',
          onPress: async () => {
            setFormData({
              cardNumber: '',
              cardHolder: '',
              expDate: '',
              cvv: '',
            });
            try {
              await SecureStorageService.removePaymentData();
            } catch (error) {
              console.error('Error clearing stored data:', error);
            }
          },
        },
      ]
    );
  };

  const cardType = getCardType(formData.cardNumber);

  if (isLoading) {
    return (
      <View style={styles.loadingContainer}>
        <Text>Cargando datos guardados...</Text>
      </View>
    );
  }

  return (
    <View>
      <View style={styles.header}>
        <Text style={styles.title}>Datos de la Tarjeta</Text>
        {(formData.cardNumber || formData.cardHolder || formData.expDate) && (
          <Button title="Limpiar" onPress={handleClearForm} color="#FF5252" />
        )}
      </View>

      {/* Campos del formulario */}
      <Text style={styles.label}>Número de Tarjeta</Text>
      <TextInput
        style={[styles.input, errors.cardNumber && styles.inputError]}
        keyboardType="numeric"
        value={formData.cardNumber}
        onChangeText={handleChange('cardNumber')}
        placeholder="1234 5678 9012 3456"
        maxLength={19}
      />
      {errors.cardNumber && (
        <Text style={styles.errorText}>{errors.cardNumber}</Text>
      )}
      {cardType && <Text style={styles.cardType}>Tipo: {cardType}</Text>}

      <Text style={styles.label}>Nombre del Titular</Text>
      <TextInput
        style={[styles.input, errors.cardHolder && styles.inputError]}
        value={formData.cardHolder}
        onChangeText={handleChange('cardHolder')}
        placeholder="JOHN DOE"
        autoCapitalize="characters"
      />
      {errors.cardHolder && (
        <Text style={styles.errorText}>{errors.cardHolder}</Text>
      )}

      <Text style={styles.label}>Expiración (MM/YY)</Text>
      <TextInput
        style={[styles.input, errors.expDate && styles.inputError]}
        value={formData.expDate}
        onChangeText={handleChange('expDate')}
        placeholder="MM/YY"
        keyboardType="numeric"
        maxLength={5}
      />
      {errors.expDate && <Text style={styles.errorText}>{errors.expDate}</Text>}

      <Text style={styles.label}>CVV</Text>
      <TextInput
        style={[styles.input, errors.cvv && styles.inputError]}
        keyboardType="numeric"
        value={formData.cvv}
        onChangeText={handleChange('cvv')}
        placeholder="123"
        secureTextEntry
        maxLength={4}
      />
      {errors.cvv && <Text style={styles.errorText}>{errors.cvv}</Text>}

      <View style={styles.buttonContainer}>
        <Button title="Confirmar" onPress={handleConfirm} />
        <View style={styles.marginBottom5} />
        <Button title="Cerrar" onPress={onClose} color="#999" />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  label: {
    marginBottom: 4,
    fontSize: 14,
    fontWeight: '500',
    color: '#333',
  },
  input: {
    borderWidth: 1,
    borderColor: '#ccc',
    marginBottom: 8,
    padding: 8,
    borderRadius: 4,
    backgroundColor: 'white',
  },
  inputError: {
    borderColor: '#FF5252',
    backgroundColor: '#FFF8F8',
  },
  errorText: {
    color: '#FF5252',
    fontSize: 12,
    marginBottom: 8,
  },
  cardType: {
    fontSize: 12,
    marginBottom: 8,
    color: 'green',
  },
  marginBottom5: {
    marginBottom: 5,
  },
  loadingContainer: {
    padding: 20,
    alignItems: 'center',
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 16,
  },
  title: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#333',
  },
  buttonContainer: {
    marginTop: 20,
  },
});

export default CreditCardForm;
