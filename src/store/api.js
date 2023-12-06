import axios from 'axios'

const BASE_URL = 'http://localhost:9999/api' || import.meta.env.VITE_API_URL ;

const api = axios.create({
    baseURL: BASE_URL,
});

export const getProductList = () => api.get('/productlist')
export const createProduct = (productData) => api.post('/createproduct', productData);