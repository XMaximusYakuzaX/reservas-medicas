import http from 'k6/http';
import { sleep, check } from 'k6';

export const options = { vus: 1, iterations: 10 };

export default function () {
  const res = http.get('http://host.docker.internal:4000/');
  check(res, { 'status 200': (r) => r.status === 200 });
  sleep(0.5);
}
