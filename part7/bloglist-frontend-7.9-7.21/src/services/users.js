import axios from 'axios';

const getAll = () => {
    return axios.get('/api/users');
};

export default {
    getAll,
};
