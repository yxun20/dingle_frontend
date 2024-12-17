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
const token = useTokenStore.getState().token;
httpClient.interceptors.request.use(config => {
  
  if (token) {
    console.log(token);
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
      alert('403 에러');
    }
    return Promise.reject(error);
  }
);

export default httpClient;
