import axios from 'axios'

const create = (personObject) => {
    return axios.post('http://localhost:3001/persons', personObject).then(response => response.data);
}

const getAll = () => {
    return axios.get("http://localhost:3001/persons").then((response) => response.data);
}

export default {
    create,
    getAll
}