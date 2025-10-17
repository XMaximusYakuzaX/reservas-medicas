// src/navigation/AppNavigator.tsx
import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { useAuth } from '../auth/useAuth';
import LoginScreen from '../screens/LoginScreen';
import HomeScreen from '../screens/HomeScreen';
import VerifyOTPScreen from '../screens/VerifyOTPScreen';
import WeatherScreen from '../screens/WeatherScreen';
import ProfileScreen from '../screens/ProfileScreen';

export type RootStackParamList = {
  Login: undefined;
  VerifyOTP: undefined;
  Home: undefined;
  Weather: undefined;
  Profile: undefined;
};

const Stack = createNativeStackNavigator<RootStackParamList>();

export default function AppNavigator() {
  const { token, isChecking } = useAuth();

  if (isChecking) return null;

  return (
    <NavigationContainer>
      <Stack.Navigator>
        {!token ? (
          <>
            <Stack.Screen
              name="Login"
              component={LoginScreen}
              options={{ headerShown: false }}
            />
            <Stack.Screen
              name="VerifyOTP"
              component={VerifyOTPScreen}
              options={{ title: 'Verificación MFA' }}
            />
          </>
        ) : (
          <>
            <Stack.Screen
              name="Home" component={HomeScreen} options={{ title: 'Inicio' }}
            />
            <Stack.Screen
              name="Weather" component={WeatherScreen} options={{ title: 'Weather' }}
            />
            <Stack.Screen
              name="Profile"
              component={ProfileScreen}
              options={{ title: 'Perfil (IMC)' }}
            />
          </>
        )}
      </Stack.Navigator>
    </NavigationContainer>
  );
}
