import React, { useState } from 'react';
import { View, Text, TextInput, Button, Alert } from 'react-native';
import { auth } from '../auth/firebaseConfig';
import { verifyOTP } from '../auth/mfaService';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { RootStackParamList } from '../navigation/AppNavigator';

type Props = NativeStackScreenProps<RootStackParamList, 'VerifyOTP'>;

export default function VerifyOTPScreen({ route, navigation }: Props) {
  const { verificationId } = route.params; 
  const [code, setCode] = useState('');

  const handleVerify = async () => {
    try {
      await verifyOTP(auth, verificationId, code);
      Alert.alert('Éxito', 'Verificación completada');
      navigation.replace('Home');
    } catch (error: unknown) {
      if (error instanceof Error) {
        Alert.alert('Error', error.message);
      } else {
        Alert.alert('Error', 'Ocurrió un error desconocido durante la verificación.');
      }
    }
  };

  return (
    <View style={{ flex: 1, justifyContent: 'center', padding: 16 }}>
      <Text style={{ fontSize: 20, marginBottom: 8 }}>Introduce el código OTP</Text>
      <TextInput
        style={{ borderWidth: 1, padding: 10, borderRadius: 5 }}
        value={code}
        onChangeText={setCode}
        keyboardType="number-pad"
      />
      <Button title="Verificar código" onPress={handleVerify} />
    </View>
  );
}
