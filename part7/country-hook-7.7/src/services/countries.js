import axios from 'axios'

const getCountrieData = (countryName) => {
    return axios.get(`https://studies.cs.helsinki.fi/restcountries/api/name/${countryName}`)
}
export default {
    getCountrieData,
};