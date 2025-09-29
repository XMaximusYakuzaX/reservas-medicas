import axios from 'axios';
import Constants from 'expo-constants';

// ---- OPENWEATHER (requiere API key) ----
const OW_KEY = String(Constants.expoConfig?.extra?.OPENWEATHER_API_KEY);

// ---- Open-Meteo (sin key) ----
// Coordenadas de Tehuacán, Puebla (puedes cambiarlas por lo que el usuario escriba si quieres geocodificar)
const CITIES: Record<string, { lat: number; lon: number }> = {
  tehuacan: { lat: 18.4616, lon: -97.3926 },
};

function mapWeatherCodeToDesc(code: number): string {
  // Mapeo resumido (Open-Meteo weather_code)
  if ([0].includes(code)) return 'despejado';
  if ([1, 2, 3].includes(code)) return 'parcialmente nublado';
  if ([45, 48].includes(code)) return 'niebla';
  if ([51, 53, 55, 56, 57].includes(code)) return 'llovizna';
  if ([61, 63, 65, 66, 67].includes(code)) return 'lluvia';
  if ([71, 73, 75, 77].includes(code)) return 'nieve';
  if ([80, 81, 82].includes(code)) return 'chubascos';
  if ([85, 86].includes(code)) return 'chubascos de nieve';
  if ([95, 96, 99].includes(code)) return 'tormenta';
  return 'condición desconocida';
}

export const getWeatherByCity = async (city: string) => {
  // 1) Intentar OpenWeather primero
  try {
    if (!OW_KEY || OW_KEY.trim().length < 10) {
      throw new Error('OW_KEY_missing');
    }
    const { data } = await axios.get('https://api.openweathermap.org/data/2.5/weather', {
      params: { q: city, appid: OW_KEY, units: 'metric', lang: 'es' },
      timeout: 10000,
    });
    return {
      temp: data.main.temp,
      desc: data.weather?.[0]?.description || 'sin descripción',
      source: 'OpenWeather',
    };
  } catch (err: any) {
    const status = err?.response?.status;
    const msg = err?.response?.data?.message || err?.message || 'error';
    // Si falla por 401/403/OW_KEY_missing u otro motivo → usar Open-Meteo
    console.log('[WEATHER] OpenWeather fallo:', status, msg);

    // 2) Fallback a Open-Meteo
    // Normalizamos la ciudad para lookup básico (suficiente para la demo)
    const key = city.toLowerCase().normalize('NFD').replace(/[\u0300-\u036f]/g, '');
    const coords = CITIES[key] || CITIES['tehuacan'];

    const { data } = await axios.get('https://api.open-meteo.com/v1/forecast', {
      params: {
        latitude: coords.lat,
        longitude: coords.lon,
        current: 'temperature_2m,weather_code',
        timezone: 'auto',
      },
      timeout: 10000,
    });

    const temp = data?.current?.temperature_2m;
    const code = data?.current?.weather_code as number | undefined;
    const desc = mapWeatherCodeToDesc(code ?? -1);

    if (typeof temp !== 'number') {
      throw new Error('No se pudo obtener el clima de la fuente alternativa');
    }

    return { temp, desc, source: 'Open-Meteo' };
  }
};