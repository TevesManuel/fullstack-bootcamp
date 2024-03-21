import { useEffect, useState } from 'react'
import countriesService from './services/CountriesService'
import CountriesDisplay from './components/CountriesDisplay';
import Filter from './components/Filter'
import './style.css'

const App = () => {
  const [countriesData, setCountriesData] = useState(null);
  const [filter, setFilter] = useState('');

  useEffect(() => {
  countriesService.getAllCountriesData().then(data => setCountriesData(data)) // Fetch JSON data
  } , []);

  return (
  <div>
    <Filter filter={filter} setFilter={setFilter} />
    <CountriesDisplay countriesData={countriesData} filter={filter} setFilter={setFilter}/>
  </div>
  );
}

export default App
