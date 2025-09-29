import { useNavigation } from '@react-navigation/native';
import { useEffect, useState } from 'react';
import { Alert, Button, Text, View } from 'react-native';
import { getProfile } from '../api/auth';
import { useAuth } from '../auth/useAuth';

export default function HomeScreen() {
  const { user, logout } = useAuth();
  const [profileOk, setProfileOk] = useState<string>('');
  const navigation = useNavigation<any>();

  useEffect(() => {
    (async () => {
      try {
        const p = await getProfile();
        setProfileOk(`/profile OK para ${p.email}`);
      } catch {
        Alert.alert('Error', 'No se pudo validar el endpoint protegido');
      }
    })();
  }, []);

  return (
    <View
      style={{
        flex: 1,                 // ocupa toda la pantalla
        justifyContent: 'center', // centra verticalmente
        alignItems: 'center',     // centra horizontalmente
        padding: 16,
        gap: 12,
      }}
    >
      <Text style={{ fontSize: 22, fontWeight: '600' }}>
        Bienvenido, {user?.name}
      </Text>

      {profileOk ? <Text>{profileOk}</Text> : null}

      <Button title="Ver clima" onPress={() => navigation.navigate('Weather')} />

      <View style={{ height: 12 }} />
      <Button title="Cerrar sesión" onPress={logout} />
    </View>
  );
}