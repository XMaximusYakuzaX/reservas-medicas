import '@testing-library/jest-native/extend-expect';

// Mock de SecureStore para controlar el token en tests
jest.mock('expo-secure-store', () => ({
  getItemAsync: jest.fn(async () => null),
  setItemAsync: jest.fn(async () => undefined),
  deleteItemAsync: jest.fn(async () => undefined),
}));

// Si usas Constants.expoConfig?.extra para API_BASE_URL:
jest.mock('expo-constants', () => ({
  default: { expoConfig: { extra: { API_BASE_URL: 'http://localhost:4000' } } },
}));
