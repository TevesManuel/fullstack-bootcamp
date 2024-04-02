import axios from 'axios'

const SERVER_URL = '/api/persons'

const create = (personObject) => {
    return axios.post(SERVER_URL, personObject).then(response => response.data);
}

const getAll = () => {
    return axios.get(SERVER_URL).then((response) => response.data);
}

const remove = (id) => {
    return axios.delete(`${SERVER_URL}/${id}`);
}

const update = (id, newPersonObject) => {
    return axios.put(`${SERVER_URL}/${id}`, newPersonObject).then(response => response.data);
}

export default {
    create,
    getAll,
    remove,
    update
}