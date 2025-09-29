import { http } from './http';
export const getProfile = async () => (await http.get('/profile')).data;
