import axios from 'axios';
import useTokenStore from '@/store/TokenStore.ts';

const httpClient = axios.create({
  baseURL: '/api',
  headers: {
    Accept: 'application/json',
  },
  beforeRedirect: () => {
    console.log('Redirecting...');
  },
});

httpClient.interceptors.request.use(config => {
  const { token } = useTokenStore();
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
    config.withCredentials = true;
  } else {
    delete config.headers.Authorization;
  }
  return config;
});

httpClient.interceptors.response.use(
  response => response,
  error => {
    if (error.response?.status === 403) {
      window.location.href = '/login';
    }
    return Promise.reject(error);
  }
);

export default httpClient;
