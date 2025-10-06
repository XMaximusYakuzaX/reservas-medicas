import MockAdapter from 'axios-mock-adapter';
import http from '../src/api/http';
import { getWeather } from '../src/api/weather';

describe('Weather API with fallback', () => {
  const mock = new MockAdapter(http);

  it('uses primary provider when 200', async () => {
    mock.onGet(/openweather/).reply(200, { temp: 25 });
    const data = await getWeather('19.043,-98.2');
    expect(data.temp).toBe(25);
  });

  it('falls back when primary fails', async () => {
    mock.onGet(/openweather/).reply(500);
    mock.onGet(/open-meteo/).reply(200, { temp: 24 });
    const data = await getWeather('19.043,-98.2');
    expect(data.temp).toBe(24);
  });
});
