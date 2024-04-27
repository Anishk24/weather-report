import { useEffect, useState } from 'react'
import './App.css'

// images
import SearchIcon from "./assets/search.png";
import clearIcon from "./assets/clear.png";
import cloudIcon from "./assets/cloudy.png";
import drizzleIcon from "./assets/drizzle.png";
import rainIcon from "./assets/rain.png";
import windIcon from "./assets/wind.png";
import snowIcon from "./assets/snow.png";
import humidityIcon from "./assets/humidity.png";

const WeatherDetails = ({icon, temp, city, country, lat, log, humidity, wind}) => {
    return (
      <>
      <div className='image'>
        <img src= {icon} alt="image" />
      </div>
      <div className='temp'>{temp}°C</div>
      <div className='city'>{city}</div>
      <div className='country'>{country}</div>
      <div className='cord'>
        <div>
        <span className='lat'>latitude</span>
        <span>{lat}</span>
        </div>
        <div>
        <span className='log'>logitude</span>
        <span>{log}</span>
        </div>
      </div>
      <div className='data-container'>
        <div className='element'>
          <img src={humidityIcon} alt="image" className='icon' />
          <div className='data'>
            <div className='humidity-percentage'>{humidity}%</div>
            <div className='text'>Humidity</div>
          </div>
        </div>
        <div className='element'>
          <img src={windIcon} alt="image" className='icon' />
          <div className='data'>
            <div className='wind-percentage'>{wind} km/h</div>
            <div className='text'>Wind Speed</div>
          </div>
        </div>
      </div>
    </>
    )
}



function App() {

  
  let api_key = "f1f3f055dea3943d62e3be538a494f1d";

  const [text, setText] = useState("Bangalore")

    const [icon, setIcon] = useState(cloudIcon)
    const [temp, setTemp] = useState(0)
    const [city, setCity] = useState("Bangalore")
    const [country, setCountry] = useState("IN")
    const [lat, setLat] = useState(0)
    const [log, setLog] = useState(0)
    const [humidity, setHumidity] = useState(0)
    const [wind, setWind] = useState(0)

    const [cityNotFound, setcityNotFound] = useState(false);
    const [loading, setLoading] = useState(false)
    const [error, setError] = useState(null);

    const weatherIconMap = {
      "01d": clearIcon,
      "01n": clearIcon,
      "02d": cloudIcon,
      "03d": drizzleIcon,
      "03n": drizzleIcon,
      "04d": drizzleIcon,
      "04n": drizzleIcon,
      "09d": rainIcon,
      "09n": rainIcon,
      "10d": rainIcon,
      "10n": rainIcon,
      "13d": snowIcon,
      "13n": snowIcon,

      
    }

    const search= async () => {
      setLoading(true);

      let url = `https://api.openweathermap.org/data/2.5/weather?q=${text}&appid=${api_key}&units=Metric`;

      try { 
        let res = await fetch(url);
        let data = await res.json();
        if (data.cod === "404") {
          setcityNotFound(true);
          setLoading(false);
          return;
        }
        setHumidity(data.main.humidity);
        setWind(data.wind.speed);
        setTemp(Math.floor(data.main.temp));
        setCity(data.name);
        setCountry(data.sys.country);
        setLat(data.coord.lat);
        setLog(data.coord.lon);
        const weatherIconCode = data.weather[0].icon;
        setIcon(weatherIconMap[weatherIconCode] || clearIcon);
        setcityNotFound(false);
      } catch (error) {
        console.error("An error occured:", error.message)
        setError("An error occurred while fetching data")
      } finally {
         setLoading(false)
      }
    }



    const handleCity = (e) => {
      setText(e.target.value)
    }

    const handleKeyDown = (e) => {
      if(e.key === "Enter") {
        search();
      }
    }

    useEffect(function () {
      search();
    }, [])

  return (
    <>
      <div className='container'> 
          <div className='input-container'>
            <input type='text' 
            className='cityInput' placeholder='Search City' 
            onChange={handleCity}
            value={text}
            onKeyDown={handleKeyDown} />
            <div className='SearchIcon' onClick={() => search()}>
              <img src = {SearchIcon} alt = "Search" />
            </div>
          </div>
    
        
         { loading && <div className='loading-messages'>Loading...</div>}
         {error && <div className='error-messages'>{error}</div>}
          {cityNotFound && <div className='city-not-found'>City not found</div>}

       { !loading && !cityNotFound &&   <WeatherDetails icon={icon} temp={temp} city={city} country={country} lat={lat} log={log} humidity={humidity} wind={wind} /> }

          <p className='copyright'>
            Designed by <span>Anish</span>
          </p>
      </div>
    </>
  )
}

export default App
