import http from 'k6/http';
import { sleep } from 'k6';

export const options = {
  stages: [
    { duration: '30s', target: 20 },
    { duration: '1m', target: 50 },
    { duration: '1m', target: 100 }, // pico
    { duration: '1m', target: 0 },
  ],
  thresholds: {
    http_req_duration: ['p(95)<500'], // tolerancia mayor bajo estrés
    http_req_failed: ['rate<0.05'],
  },
};

export default function () {
  http.get('http://host.docker.internal:4000/');
  sleep(0.2);
}
