// src/screens/ProfileScreen.tsx
import React, { useEffect, useState } from 'react';
import { Alert, Button, Text, TextInput, View } from 'react-native';
import { computeBMI, getProfileByEmail, upsertProfile } from '../api/profiles';
import { useAuth } from '../auth/useAuth';

export default function ProfileScreen() {
  const { user } = useAuth(); // ya tienes name/email desde tu AuthContext
  const email = user?.email ?? '';

  const [height, setHeight] = useState<string>(''); // cm
  const [weight, setWeight] = useState<string>(''); // kg
  const [bmiText, setBmiText] = useState<string>('');

  const recalc = () => {
    const { bmi, category } = computeBMI(Number(height), Number(weight));
    if (bmi) setBmiText(`${bmi} — ${category}`);
    else setBmiText('');
  };

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
      } catch (e: any) {
        console.warn('Error cargando perfil:', e?.message || e);
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
    } catch (e: any) {
      Alert.alert('Error', e?.message ?? 'No se pudo guardar el perfil.');
    }
  };

  return (
    <View style={{ padding: 16, gap: 12 }}>
      <Text style={{ fontSize: 22, fontWeight: '700' }}>Mi Perfil de Salud</Text>
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
  );
}
