import ListOfCountries from "./ListOfCountries";
import SpecificCountry from "./SpecificCountry";

const CountriesDisplay = ({countriesData, filter, setFilter}) => {
    if (countriesData != null)
    {
        let filteredCountriesNames = countriesData
            .filter(countryData => countryData.name.common.toUpperCase().includes(filter.toUpperCase()))
            .map(countryData => countryData.name.common);

        if (filteredCountriesNames.length > 1)
        {
            return (
                <ListOfCountries filteredCountriesNames={filteredCountriesNames} setFilter={setFilter} />
            );
        }
        else if (filteredCountriesNames.length == 1)
        {
            let countryData = countriesData.find(countryData => countryData.name.common == filteredCountriesNames[0]);
            return (
                <SpecificCountry countryData={countryData}/>
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