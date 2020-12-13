import axios from 'axios';

const api = axios.create({
    baseURL: 'https://tallesreis.com.br',
});

export default api;