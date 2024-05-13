import axios from 'axios';
const baseUrl = '/api/blogs';

const getAll = () => {
    return axios.get(baseUrl).then(response => response.data);
};

const create = (blog) => {
    return axios.post(baseUrl, blog, {
        headers: {
            'Authorization': `Bearer ${JSON.parse(localStorage.getItem('user')).token}`
        }
    }).then(response => response.data);
};

const update = (blog, blodId) => {
    return axios.put(baseUrl.concat('/').concat(blodId), blog, {
        headers: {
            'Authorization': `Bearer ${JSON.parse(localStorage.getItem('user')).token}`
        }
    }).then(response => response.data);
};

export default { getAll, create, update };