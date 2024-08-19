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

const comment = (blogId, comment) => {
    return axios
        .post(
            baseUrl.concat('/').concat(blogId).concat('/').concat('comments'),
            { id: blogId, text: comment },
            {
                headers: {
                    Authorization: `Bearer ${JSON.parse(localStorage.getItem('user')).token}`,
                },
            },
        )
        .then((response) => response.data);
};

export default { getAll, create, update, remove, comment };
