import axios from 'axios';

// Use localhost:8080 for development
const API_BASE_URL = 'http://localhost:8080/api';

const api = axios.create({
  baseURL: API_BASE_URL,
  timeout: 10000,
  headers: {
    'Content-Type': 'application/json',
  }
});

export const fetchCategories = () => api.get('/categories');
export const fetchProducts = () => api.get('/products');
export const fetchProductsByCategory = (categoryId) => api.get(`/products/category/${categoryId}`);

export default api;