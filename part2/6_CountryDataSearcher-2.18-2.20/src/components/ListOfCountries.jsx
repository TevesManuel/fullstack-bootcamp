const ListOfCountries = ({filteredCountriesNames, setFilter}) => {

    const callbackShowGenerator = (countryName) => {
        return () => {
            setFilter(countryName.countryName);
        }
    };

    return (
        <div>
            {filteredCountriesNames.map((countryName, i) => <div key={i}>{countryName}&emsp;<button onClick={callbackShowGenerator({countryName})}>show</button></div>)}
        </div>
    );
};

export default ListOfCountries;