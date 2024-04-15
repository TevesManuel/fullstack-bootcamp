import axios from 'axios';

const login = (username, password) => {
    return axios.post('/api/login', { username, password });
};

export default {
    login
};