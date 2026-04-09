// src/services/api.js
import axios from 'axios';

// This is the base URL of your Java Spring Boot backend
const API_BASE_URL = 'http://localhost:8080/api';

// Create an axios instance with the base URL
const api = axios.create({
  baseURL: API_BASE_URL,
});

export const fetchCategories = () => api.get('/categories');
export const fetchProducts = () => api.get('/products');
// We'll add more API calls later (like fetchProductsByCategory)

export default api;