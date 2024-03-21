import WeatherDisplay from "./WeatherDisplay";

const SpecificCountry = ({countryData}) => {
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
            <WeatherDisplay countryData={countryData}/>
        </div>
    );
};

export default SpecificCountry;