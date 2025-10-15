import React, { useState } from 'react';
import { Alert, Button, Text, TextInput, View } from 'react-native';
import { useAuth } from '../auth/useAuth';

export default function LoginScreen() {
  const { login } = useAuth();
  const [email, setEmail] = useState('demo@med.app');
  const [password, setPassword] = useState('123456');
  const [loading, setLoading] = useState(false);

  const onSubmit = async () => {
    try {
      setLoading(true);
      await login(email, password);
    } catch (error: unknown) {
      let message = 'No se pudo iniciar sesión';
      if (error instanceof Error) message = error.message;
      Alert.alert('Error', message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <View
      style={{
        flex: 1, // ocupa toda la pantalla
        justifyContent: 'center', // centra verticalmente
        alignItems: 'center', // centra horizontalmente
        padding: 16,
        gap: 12,
      }}
    >
      <Text style={{ fontSize: 24, fontWeight: 'bold' }}>Iniciar sesión</Text>
      <TextInput
        placeholder="Email"
        value={email}
        onChangeText={setEmail}
        autoCapitalize="none"
        style={{ borderWidth: 1, width: '80%', padding: 8, borderRadius: 6 }}
      />
      <TextInput
        placeholder="Contraseña"
        value={password}
        onChangeText={setPassword}
        secureTextEntry
        style={{ borderWidth: 1, width: '80%', padding: 8, borderRadius: 6 }}
      />
      <Button title={loading ? 'Ingresando...' : 'Entrar'} onPress={onSubmit} />
    </View>
  );
}
