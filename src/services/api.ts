import axios from 'axios';

const api = axios.create({
    baseURL: 'https://tallesreis.com.br:3333',
});

export default api;