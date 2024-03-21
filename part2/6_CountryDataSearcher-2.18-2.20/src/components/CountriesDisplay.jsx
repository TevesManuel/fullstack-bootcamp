const CountriesDisplay = ({countriesData, filter}) => {
    if (countriesData != null)
    {
        let filteredCountriesNames = countriesData
            .filter(countryData => countryData.name.common.toUpperCase().includes(filter.toUpperCase()))
            .map(countryData => countryData.name.common);

        if (filteredCountriesNames.length > 1)
        {
            return (
                <div>
                {filteredCountriesNames.map((countryName, i) => <p key={i}>{countryName}</p>)}
                </div>
            );
        }
        else if (filteredCountriesNames.length == 1)
        {
            let countryData = countriesData.find(countryData => countryData.name.common == filteredCountriesNames[0]);
            return (
                <div>
                    <h1>{countryData.name.common}</h1>
                    <h4>Capital: {countryData.capital}</h4>
                    <h4>Area: {countryData.area}m²</h4>
                    <h4>Languages:</h4>
                    <ul>
                        {Object.values(countryData.languages).map((lan, i) => <li key={i}><p>{lan}</p></li>)}
                    </ul>
                    <img src={countryData.flags.png}></img>
                </div>
            );
        }
        else
        {
            return (
                <div>
                    <h2>No countrys with this names</h2>
                </div>
            );
        }
    }
    else
    {
    return (
    <div>Downloading data...</div>
    );
    }
};

export default CountriesDisplay;