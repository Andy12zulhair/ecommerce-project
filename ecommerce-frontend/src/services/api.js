// src/services/api.js
import axios from 'axios';

const API = axios.create({
  baseURL: 'http://localhost:8000/api/',
});

API.interceptors.request.use((config) => {
  const token = localStorage.getItem('token');
  if (token) config.headers.Authorization = `Bearer ${token}`;
  return config;
});

export const api = {
  login: (data) => API.post('token/', data),
  register: (data) => API.post('register/', data),

  // 1. MODIFIKASI FUNGSI INI
  // Sekarang menerima 'params' ATAU 'url' (jika pagination)
  getProducts: (paramsOrUrl) => {
    // Jika paramsOrUrl adalah string (URL lengkap dari pagination), pakai itu langsung
    if (typeof paramsOrUrl === 'string') {
      return API.get(paramsOrUrl);
    }
    // Jika object params biasa
    return API.get('products/', { params: paramsOrUrl });
  },

  getProduct: (id) => API.get(`products/${id}/`),
  createOrder: (orderData) => API.post('orders/create/', orderData),
  getMyOrders: () => API.get('orders/'),

  // 2. TAMBAHKAN FUNGSI INI
  // Untuk mengambil daftar kategori
  getCategories: () => API.get('categories/'),
};