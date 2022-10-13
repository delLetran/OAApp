
import { useState, useEffect } from 'react'
import Link from 'next/link';
import axios from 'axios';
import { apiUrls, WEATHER_API_KEY } from 'app/api'
import { WeatherBarGraph } from 'components/Chart'
import { CircularProgress, Typography } from '@mui/material';

function  MultiLocationWeather({locations}) {
  const [weatherList, setWeatherList] = useState([]);

  useEffect(() => {  //Had to pull data multiple times since weatherAPI doesn't have a bulk retrieval.
    let res_list = [];
    locations.length > 0 && locations?.map((location, index)=>{
      (async function() {
        const { data } = await axios.get(`${apiUrls.weather}?key=${WEATHER_API_KEY}&q=${location}`, {
          headers: {
            "Accept": 'Application/Json',
            "Content-Type": 'Application/Json',
          }
        })
        res_list.push(data)
        if (locations.length-1 === index) {
          setWeatherList(res_list)
        }
      })();
    });
  }, [locations]);

  return (
    weatherList.length > 0  
      ? <>
          <Typography variant='h5'>
            Graph represents different weather conditions on each Fuel Station which affects the fuel economy.
          </Typography >
          <Typography variant='subtitle2'>
            Fuel economy tests show that, in city driving, a conventional 
            gasoline car's gas mileage is roughly 15% lower at 20°F than it would be at 77°F.
            It can drop as much as 24% for short (3- to 4-mile) trips. 
            <Link href='https://fuelandfriction.com/trucking-pro/5-ways-how-the-weather-affects-your-fuel-economy/'>
              Visit Source here.
            </Link>
          </Typography>
          <WeatherBarGraph data={weatherList} />
        </>
      : <CircularProgress/>
  )
}


export default MultiLocationWeather
