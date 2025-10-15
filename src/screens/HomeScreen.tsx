// src/screens/HomeScreen.tsx
import { useNavigation, NavigationProp } from '@react-navigation/native';
import React, { useEffect, useMemo, useState } from 'react';
import { Alert, Button, Text, TextInput, View } from 'react-native';
import { getProfile } from '../api/auth';
import { computeBMI, getProfileByEmail, upsertProfile } from '../api/profiles';
import { useAuth } from '../auth/useAuth';

type RootStackParamList = {
  Profile: undefined;
  Weather: undefined;
};

export default function HomeScreen() {
  const { user, logout } = useAuth();
  const email = user?.email ?? '';
  const navigation = useNavigation<NavigationProp<RootStackParamList>>();

  // Estado del check al endpoint protegido
  const [profileOk, setProfileOk] = useState<string>('');

  // Estado del perfil de salud
  const [height, setHeight] = useState<string>(''); // cm
  const [weight, setWeight] = useState<string>(''); // kg
  const [bmiText, setBmiText] = useState<string>('');

  // --- Helpers ---
  const recalc = useMemo(
    () => () => {
      const { bmi, category } = computeBMI(Number(height), Number(weight));
      if (bmi) setBmiText(`${bmi} — ${category}`);
      else setBmiText('');
    },
    [height, weight]
  );

  // Valida endpoint protegido al montar
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

  // Carga el perfil de salud del usuario
  useEffect(() => {
    (async () => {
      try {
        if (!email) return;
        const profile = await getProfileByEmail(email);
        if (profile) {
          setHeight(String(profile.height_cm));
          setWeight(String(profile.weight_kg));
          const { bmi, category } = computeBMI(profile.height_cm, profile.weight_kg);
          setBmiText(`${bmi} — ${category}`);
        }
      } catch (error: unknown) {
        if (error instanceof Error) {
          console.warn('Error cargando perfil:', error.message);
        } else {
          console.warn('Error cargando perfil:', error);
        }
      }
    })();
  }, [email]);

  const onSave = async () => {
    try {
      if (!email) return Alert.alert('Error', 'No hay email de usuario.');
      if (!height || !weight) return Alert.alert('Error', 'Altura y peso son requeridos.');

      const saved = await upsertProfile({
        email,
        height_cm: Number(height),
        weight_kg: Number(weight),
      });

      const { bmi, category } = computeBMI(saved.height_cm, saved.weight_kg);
      setBmiText(`${bmi} — ${category}`);
      Alert.alert('Listo', 'Perfil guardado correctamente.');
    } catch (error: unknown) {
      if (error instanceof Error) {
        Alert.alert('Error', error.message);
      } else {
        Alert.alert('Error', 'No se pudo guardar el perfil.');
      }
    }
  };

  return (
    <View style={{ flex: 1, padding: 16, gap: 16 }}>
      {/* Encabezado de bienvenida */}
      <View style={{ alignItems: 'center', gap: 8, paddingVertical: 8 }}>
        <Text style={{ fontSize: 22, fontWeight: '600' }}>Bienvenido, {user?.name}</Text>
        {!!profileOk && <Text>{profileOk}</Text>}
      </View>

      {/* Acciones rápidas */}
      <View style={{ gap: 12 }}>
        <Button title="Ir a mi Perfil" onPress={() => navigation.navigate('Profile')} />
        <Button title="Ver clima" onPress={() => navigation.navigate('Weather')} />
        <Button title="Cerrar sesión" onPress={logout} />
      </View>

      {/* Separador */}
      <View style={{ height: 8 }} />

      {/* Sección de Perfil de Salud */}
      <View style={{ gap: 12 }}>
        <Text style={{ fontSize: 20, fontWeight: '700' }}>Mi Perfil de Salud</Text>
        <Text style={{ opacity: 0.7 }}>{email}</Text>

        <Text>Altura (cm)</Text>
        <TextInput
          placeholder="Ejemplo: 175"
          keyboardType="numeric"
          value={height}
          onChangeText={(t) => {
            setHeight(t);
            setTimeout(recalc, 0);
          }}
          style={{ borderWidth: 1, borderColor: '#ccc', padding: 8, borderRadius: 8 }}
        />

        <Text>Peso (kg)</Text>
        <TextInput
          placeholder="Ejemplo: 70"
          keyboardType="numeric"
          value={weight}
          onChangeText={(t) => {
            setWeight(t);
            setTimeout(recalc, 0);
          }}
          style={{ borderWidth: 1, borderColor: '#ccc', padding: 8, borderRadius: 8 }}
        />

        <Button title="Guardar" onPress={onSave} />

        {!!bmiText && (
          <Text style={{ marginTop: 12, fontSize: 16 }}>
            IMC: <Text style={{ fontWeight: '700' }}>{bmiText}</Text>
          </Text>
        )}
      </View>
    </View>
  );
}
