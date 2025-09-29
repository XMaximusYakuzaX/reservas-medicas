import { useState } from 'react';
import {
    ActivityIndicator,
    Alert,
    Button,
    KeyboardAvoidingView,
    Platform,
    Text,
    TextInput,
    View,
} from 'react-native';
import { getWeatherByCity } from '../api/weather';

export default function WeatherScreen() {
  const [city, setCity] = useState('Tehuacan');
  const [temp, setTemp] = useState<number | null>(null);
  const [desc, setDesc] = useState<string | null>(null);
  const [source, setSource] = useState<string | null>(null);
  const [lastUpdated, setLastUpdated] = useState<Date | null>(null);
  const [loading, setLoading] = useState(false);

  const onFetch = async () => {
    try {
      setLoading(true);
      // limpiamos antes de consultar para que se note el cambio
      setTemp(null);
      setDesc(null);
      setSource(null);
      setLastUpdated(null);

      const result = await getWeatherByCity(city);
      setTemp(result.temp);
      setDesc(result.desc);
      if ('source' in result && typeof result.source === 'string') {
        setSource(result.source);
      }
      setLastUpdated(new Date());
    } catch (e: any) {
      const msg =
        typeof e?.message === 'string'
          ? e.message
          : 'No se pudo obtener el clima (revisa API key / red).';
      Alert.alert('Error', msg);
    } finally {
      setLoading(false);
    }
  };

  return (
    <KeyboardAvoidingView
      style={{ flex: 1 }}
      behavior={Platform.select({ ios: 'padding', android: undefined })}
    >
      <View
        style={{
          flex: 1,
          justifyContent: 'center',   // centra vertical
          alignItems: 'center',       // centra horizontal
          padding: 16,
          gap: 12,
        }}
      >
        <Text style={{ fontSize: 20, fontWeight: '600' }}>Clima</Text>

        <TextInput
          placeholder="Ciudad"
          value={city}
          onChangeText={setCity}
          autoCapitalize="words"
          style={{
            borderWidth: 1,
            borderColor: '#ccc',
            padding: 10,
            borderRadius: 6,
            width: '80%',
          }}
        />

        <View style={{ width: '80%' }}>
          <Button
            title={loading ? 'Consultando...' : 'Consultar'}
            onPress={onFetch}
            disabled={loading}
          />
        </View>

        {loading && (
          <View style={{ marginTop: 12 }}>
            <ActivityIndicator size="small" />
          </View>
        )}

        {temp !== null && (
          <View style={{ marginTop: 12, alignItems: 'center' }}>
            <Text>Temperatura: {temp}°C — {desc}</Text>
            <Text style={{ marginTop: 4, opacity: 0.8 }}>
              {source ? `Fuente: ${source}` : 'Fuente: —'}
            </Text>
            {lastUpdated && (
              <Text style={{ marginTop: 2, fontSize: 12, opacity: 0.7 }}>
                Actualizado: {lastUpdated.toLocaleTimeString()}
              </Text>
            )}
          </View>
        )}
      </View>
    </KeyboardAvoidingView>
  );
}
