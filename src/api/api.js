import axios from 'axios';

const API_URL = 'http://localhost:5000/api'; // Replace with your server URL if needed

// Auth API calls
export const registerUser = async (userData) => {
    const response = await axios.post(`${API_URL}/auth/register`, userData);
    return response.data;
};

export const loginUser = async (userData) => {
    const response = await axios.post(`${API_URL}/auth/login`, userData);
    return response.data;
};

// Cart API calls
export const addToCart = async (cartData) => {
    const response = await axios.post(`${API_URL}/cart`, cartData);
    return response.data;
};

export const updateCartItem = async (id, quantity) => {
    const response = await axios.put(`${API_URL}/cart/${id}`, { quantity });
    return response.data;
};

export const removeCartItem = async (id, userId) => {
    const response = await axios.delete(`${API_URL}/cart/${id}`, { data: { userId } });
    return response.data;
};

// Product API calls
export const fetchProducts = async () => {
    const response = await axios.get(`${API_URL}/products`);
    return response.data;
};

export const fetchProductById = async (id) => {
    const response = await axios.get(`${API_URL}/products/${id}`);
    return response.data;
};
