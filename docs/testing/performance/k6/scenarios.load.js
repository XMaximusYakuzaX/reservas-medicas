import http from 'k6/http';
import { sleep, check } from 'k6';

export const options = {
  stages: [
    { duration: '1m', target: 10 }, // ramp-up
    { duration: '2m', target: 10 }, // steady
    { duration: '1m', target: 0 }, // ramp-down
  ],
  thresholds: {
    http_req_duration: ['p(95)<300'], // P95 < 300 ms
    http_req_failed: ['rate<0.01'], // <1% errores
  },
};

export default function () {
  const res = http.get('http://host.docker.internal:4000/profile');
  check(res, { 'status 200/302/401': (r) => [200, 302, 401].includes(r.status) });
  sleep(1);
}
