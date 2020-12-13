import axios from 'axios';

const api = axios.create({
    baseURL: 'https://134.209.119.206:3333',
});

export default api;