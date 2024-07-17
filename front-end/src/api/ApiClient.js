import axios from 'axios';

export const apiClient = axios.create({
  baseURL: '/',
});

apiClient.interceptors.request.use(
  config => {
      const token = localStorage.getItem('suhwagdamToken') || sessionStorage.getItem('suhwagdamToken');
      // console.log('토큰:', token); 
      if (token) {
          config.headers.Authorization = `Bearer ${token}`;
      }
      return config;
  },
  error => {
      return Promise.reject(error);
  }
);