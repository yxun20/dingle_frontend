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
      window.location.href = '/login';
      alert('로그인에 실패하였습니다. 이메일과 비밀번호를 확인하세요.');
    }
    return Promise.reject(error);
  }
);

export default httpClient;
