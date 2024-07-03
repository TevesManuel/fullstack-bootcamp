import countriesService from './../../services/countries'
import { useState, useEffect } from 'react'

const useCountry = (name) => {
    const [country, setCountry] = useState(null)
    console.log("Call useCountry", name);
  
    useEffect(() => {
      if(name !== '')
      {
        console.log("Call useCountry effect", name);
        countriesService.getCountrieData(name).then(response => setCountry(response));
      }
    }, [name])
  
    return country
  }

  export default useCountry