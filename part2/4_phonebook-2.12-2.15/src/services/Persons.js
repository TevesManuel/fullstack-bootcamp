import axios from 'axios'

const create = (personObject) => {
    return axios.post('http://localhost:3001/persons', personObject).then(response => response.data);
}

const getAll = () => {
    return axios.get("http://localhost:3001/persons").then((response) => response.data);
}

const remove = (id) => {
    return axios.delete(`http://localhost:3001/persons/${id}`);
}

export default {
    create,
    getAll,
    remove
}