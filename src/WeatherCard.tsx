// WeatherCard.js
import React from 'react';
import { WeatherData } from './App';
// interfaccia props
interface WeatherCardProps {
  index: number;
  weatherData: WeatherData; 
  getWeatherImage: (main: string) => string; 
}


function WeatherCard(props : WeatherCardProps) {
  
  const index = props.index; // questo è il nuovo props che aggiungi
  const visibilityInKM = props.weatherData?.list[index].visibility / 1000;
  const speedInKmh = props.weatherData?.list[index].wind.speed * 3.6;
  const roundedSpeed = Math.round(speedInKmh);
//ora 
  const ora = new Date(props.weatherData.list[index].dt_txt);

  const options: Intl.DateTimeFormatOptions = {
    month: "long",
    day: "numeric",
    hour12: false,
    hour: "2-digit",
    // minute: "2-digit",
  };
  
  const ok: string = ora.toLocaleDateString("it-IT", options);
  const diviso: string[] = ok.split(' ');
  const time: string = diviso[3] + ' ' + diviso[4];
  
  const currentDate: Date = new Date();
  const dataCorrente: number = currentDate.getDate();
  const dataDomani: number  = currentDate.getDate() + 1;
  let data: string = '';
  
  if (dataCorrente === Number(diviso[0])) {
    data = "OGGI";
  } else if (dataDomani === Number(diviso[0])) {
    data = "Domani";
  }
  //fine ora
  



  return (
    <div className='flex flex-col justify-center items-center h-[auto] w-[auto] text-center m-4'>
      <h4 ><span className='font-bold text-lg'>{data}</span> <br /> {time}</h4>
      <p className=' pt-3 text-base text capitalize drop-shadow-md shadow-black font-normal'>{props.weatherData.list[index].weather[0].description}</p>
      <img
        src={props.getWeatherImage(props.weatherData.list[index].weather[0].main)}
        alt={props.weatherData.list[index].weather[0].main}
        className=' w-20 h-20 drop-shadow-2xl shadow-black'
      />
      <p className='pt-3 text-2xl drop-shadow-lg shadow-black font-bold'>{props.weatherData.list[index].main.temp}°C</p>
      <p className=' pt-3 text-sm text capitalize drop-shadow-md shadow-black font-thin'>Visibilità: {visibilityInKM} Km</p>
      <p className=' text-sm capitalize drop-shadow-md shadow-black font-thin'>Umidità: {props.weatherData.list[index].main.humidity} %</p>
      <p className=' text-sm text  drop-shadow-md shadow-black font-thin'>Vento: {roundedSpeed} Km/h</p>
    </div>
  );
}

export default WeatherCard;
