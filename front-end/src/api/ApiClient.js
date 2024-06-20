import axios from 'axios';

export const apiClient = axios.create(
    {
        baseURL: '/',
        headers: {
          Authorization: `Bearer ${localStorage.getItem('suhwagdamToken') || sessionStorage.getItem('suhwagdamToken')}`,
        }
    }
);