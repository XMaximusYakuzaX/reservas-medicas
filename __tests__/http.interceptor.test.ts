import MockAdapter from 'axios-mock-adapter';
import * as SecureStore from 'expo-secure-store';
import http from '../src/api/http';

describe('HTTP interceptor', () => {
  const mock = new MockAdapter(http);

  beforeEach(() => {
    mock.reset();
    (SecureStore.getItemAsync as jest.Mock).mockResolvedValue(null);
  });

  it('adds Authorization header when token exists', async () => {
    (SecureStore.getItemAsync as jest.Mock).mockResolvedValue('abc.token.jwt');
    mock.onGet('/profile').reply((config) => {
      expect(config.headers?.Authorization).toBe('Bearer abc.token.jwt');
      return [200, { ok: true }];
    });

    const res = await http.get('/profile');
    expect(res.status).toBe(200);
  });

  it('cleans token on 401 responses', async () => {
    mock.onGet('/profile').reply(401, { message: 'Unauthorized' });
    await expect(http.get('/profile')).rejects.toBeTruthy();
    expect(SecureStore.deleteItemAsync).toHaveBeenCalled();
  });
});
