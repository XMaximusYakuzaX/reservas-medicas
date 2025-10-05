import MockAdapter from 'axios-mock-adapter';
import * as SecureStore from 'expo-secure-store';
import { getProfile, login } from '../src/api/auth'; // ajusta rutas
import http from '../src/api/http';

describe('Auth API', () => {
  const mock = new MockAdapter(http);

  beforeEach(() => {
    mock.reset();
    (SecureStore.setItemAsync as jest.Mock).mockClear();
    (SecureStore.getItemAsync as jest.Mock).mockResolvedValue(null);
  });

  it('login stores token and returns payload', async () => {
    mock.onPost('/auth/login').reply(200, { token: 'abc.jwt', user: { email: 'demo@med.app' } });
    const result = await login({ email: 'demo@med.app', password: '123456' });
    expect(SecureStore.setItemAsync).toHaveBeenCalledWith('token', 'abc.jwt');
    expect(result.user.email).toBe('demo@med.app');
  });

  it('getProfile returns user when authorized', async () => {
    (SecureStore.getItemAsync as jest.Mock).mockResolvedValue('abc.jwt');
    mock.onGet('/profile').reply(200, { email: 'demo@med.app' });
    const profile = await getProfile();
    expect(profile.email).toBe('demo@med.app');
  });

  it('login propagates error on invalid credentials', async () => {
    mock.onPost('/auth/login').reply(401, { message: 'Invalid credentials' });
    await expect(login({ email: 'x@y.z', password: 'bad' })).rejects.toBeTruthy();
  });
});
