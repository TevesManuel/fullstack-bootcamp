import axios from 'axios'

const getAllNamesCountrys = () => {
    return axios.get("https://studies.cs.helsinki.fi/restcountries/api/all").then((response) => response.data.map(countryData => countryData.name.common));
};
const getAllCountriesData = () => {
    return axios.get("https://studies.cs.helsinki.fi/restcountries/api/all").then((response) => response.data);
}
export default {
    getAllNamesCountrys,
    getAllCountriesData
};