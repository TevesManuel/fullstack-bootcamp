import axios from 'axios';
const baseUrl = '/api/blogs';

const getAll = () => {
    return axios.get(baseUrl).then((response) => response.data);
};

const create = (blog) => {
    return axios
        .post(baseUrl, blog, {
            headers: {
                Authorization: `Bearer ${JSON.parse(localStorage.getItem('user')).token}`,
            },
        })
        .then((response) => response.data);
};

const update = (request) => {
    return axios
        .put(baseUrl.concat('/').concat(request.id), request.data, {
            headers: {
                Authorization: `Bearer ${JSON.parse(localStorage.getItem('user')).token}`,
            },
        })
        .then((response) => response.data);
};

const remove = (blogId) => {
    return axios
        .delete(baseUrl.concat('/').concat(blogId), {
            headers: {
                Authorization: `Bearer ${JSON.parse(localStorage.getItem('user')).token}`,
            },
        })
        .then((res) => {
            return res.status;
        });
};

export default { getAll, create, update, remove };
