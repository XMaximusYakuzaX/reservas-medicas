// src/navigation/AppNavigator.tsx
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import React from 'react';
import { useAuth } from '../auth/useAuth';
import HomeScreen from '../screens/HomeScreen';
import LoginScreen from '../screens/LoginScreen';
import ProfileScreen from '../screens/ProfileScreen';
import WeatherScreen from '../screens/WeatherScreen';

export type RootStackParamList = {
  Login: undefined;
  Home: undefined;
  Weather: undefined;
  Profile: undefined; // 👈 nuevo
};

const Stack = createNativeStackNavigator<RootStackParamList>();

export default function AppNavigator() {
  const { token, isChecking } = useAuth();

  if (isChecking) return null;

  return (
    <NavigationContainer>
      <Stack.Navigator>
        {!token ? (
          <Stack.Screen name="Login" component={LoginScreen} options={{ title: 'Iniciar sesión' }} />
        ) : (
          <>
            <Stack.Screen name="Home" component={HomeScreen} options={{ title: 'Home' }} />
            <Stack.Screen name="Weather" component={WeatherScreen} options={{ title: 'Weather' }} />
            <Stack.Screen name="Profile" component={ProfileScreen} options={{ title: 'Perfil (IMC)' }} />
          </>
        )}
      </Stack.Navigator>
    </NavigationContainer>
  );
}
