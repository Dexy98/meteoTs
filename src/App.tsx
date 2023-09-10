import React, { useState } from 'react'
import axios from 'axios';
//componenti
import WeatherCard from './WeatherCard';
//stile
import './App.css';
//icone
import { BsSearch } from 'react-icons/bs'
import sun from './assets/sun.png';
import Clouds from './assets/clouds.png';
import rain from './assets/cloudy.png';
import clearSky from './assets/clear-sky.png';
import Lottie from "lottie-react";
import Loading from "./assets/lottie/loading.json"

export interface WeatherData {
  cod: string;
  message: number;
  cnt: number;
  list: WeatherItem[];
  city: {
    id: number;
    name: string;
    coord: {
      lat: number;
      lon: number;
    };
    country: string;
    population: number;
    timezone: number;
    sunrise: number;
    sunset: number;
  };
}

interface WeatherItem {
  dt: number;
  main: {
    temp: number;
    feels_like: number;
    temp_min: number;
    temp_max: number;
    pressure: number;
    sea_level: number;
    grnd_level: number;
    humidity: number;
    temp_kf: number;
  };
  weather: {
    id: number;
    main: string;
    description: string;
    icon: string;
  }[];
  clouds: {
    all: number;
  };
  wind: {
    speed: number;
    deg: number;
    gust: number;
  };
  visibility: number;
  pop: number;
  sys: {
    pod: string;
  };
  dt_txt: string;
}


function App() {
  const [city, setCity] = useState<string>('Cosenza');
  const [loading, setLoading] = useState<boolean>(false);
  const [weatherData, setWeatherData] = useState<WeatherData | null>(null);

  function getWeatherImage(main:string) {
    const lowerCaseDescription = main.trim();

    if (lowerCaseDescription === 'Clear') {
      return sun;
    }
    if (lowerCaseDescription === 'Clouds') {
      return Clouds;
    }
    if (lowerCaseDescription === 'Rain') {
      return rain;
    }

    return clearSky;
  };

  const apiKey = process.env.REACT_APP_WEATHER_KEY;
  const fetchWeather = async (e:any) => {
    e.preventDefault();
    setLoading(true);
    try {
      const response = await axios.get(
        `https://api.openweathermap.org/data/2.5/forecast?q=${city}&cnt=10&units=metric&appid=${apiKey}`
      );
        setWeatherData(response.data);
        //log dati API 
      console.log('data response',response.data)
      setLoading(false);
    } catch (error) {
      console.log(error);
      setLoading(true);
      alert("Errore")
    }

  };

  let visibilityInKM: number | undefined;
  let speedInKmh: number | undefined;
  let roundedSpeed: number | undefined;
  
  if (weatherData && weatherData.list && weatherData.list[0]) {
    visibilityInKM = weatherData.list[0].visibility / 1000;
    speedInKmh = weatherData.list[0].wind.speed * 3.6;
    roundedSpeed = Math.round(speedInKmh);
  }
  
  // Ora puoi utilizzare visibilityInKM, speedInKmh e roundedSpeed anche al di fuori del blocco if.
  
  return (
    <div className=' bg-[#0B0E12] mx-auto flex justify-center max-w-xl flex-col h-full transition-all drop-shadow-2xl shadow-black shadow-xl rounded-b-3xl'>
          
      {loading && <div><Lottie animationData={Loading} loop={true}/></div>}

      <h1 className='flex justify-center text-white text-4xl font-bold -tracking-tighter mt-1'>METEO</h1>
      <div className='bg-[#0B0E12] mx-auto flex justify-center max-w-xl p-3
    '>

        <form onSubmit={fetchWeather} className='flex items-center '>
          <input
            className='bg-[#0B0E12] text-white p-2 border border-black shadow-sm shadow-black'
            type="text"
            value={city}
            onChange={(e) => setCity(e.target.value)}
          />
          <button type="submit">
            <BsSearch size={30} className='text-white mx-2' />
          </button>
        </form>

      </div>
      {weatherData && (
        <div className='flex items-center p-4 h-full text-white flex-col transition-all'>
          <h2 className='pt-3 text-4xl text-[#9FE6FD] drop-shadow-lg shadow-neutral-800 uppercase tracking-tighter font-black'>{weatherData.city.name}</h2>
          <p className=' pt-3 text-3xl text capitalize drop-shadow-md shadow-black font-normal'>{weatherData.list[0].weather[0].description}</p>
          <img
            src={getWeatherImage(weatherData.list[0].weather[0].main)}
            alt={weatherData.list[0].weather[0].main}
            className='w-32 h-32 drop-shadow-2xl shadow-black'
          />
          <p className='pt-3 text-6xl drop-shadow-lg shadow-black font-bold'>{weatherData.list[0].main.temp}°C</p>
          <p className=' pt-3 text-2xl text capitalize drop-shadow-md shadow-black font-thin'>Visibilità: {visibilityInKM} Km</p>
          <p className=' text-2xl text capitalize drop-shadow-md shadow-black font-thin'>Umidità: {weatherData.list[0].main.humidity} %</p>
          <p className=' text-2xl text  drop-shadow-md shadow-black font-thin'>Vento: {roundedSpeed} Km/h</p>
          <article className='w-full overflow-x-auto mt-8'>
            <div className=' grid-flow-col gap-5 inline-grid' style={{gridAutoColumns: "15ch"}}  >
            <WeatherCard weatherData={weatherData} getWeatherImage={getWeatherImage} index={1} /> 
            <WeatherCard weatherData={weatherData} getWeatherImage={getWeatherImage} index={2} /> 
            <WeatherCard weatherData={weatherData} getWeatherImage={getWeatherImage} index={3} /> 
            <WeatherCard weatherData={weatherData} getWeatherImage={getWeatherImage} index={4} /> 
            <WeatherCard weatherData={weatherData} getWeatherImage={getWeatherImage} index={5} /> 
            <WeatherCard weatherData={weatherData} getWeatherImage={getWeatherImage} index={6} /> 
            <WeatherCard weatherData={weatherData} getWeatherImage={getWeatherImage} index={7} /> 
            <WeatherCard weatherData={weatherData} getWeatherImage={getWeatherImage} index={8} /> 
            <WeatherCard weatherData={weatherData} getWeatherImage={getWeatherImage} index={9} /> 
            </div>
          </article>
        </div>
      )}
    </div>

  );
}
export default App;
