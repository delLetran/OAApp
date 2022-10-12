
import { useState, useEffect } from 'react'
import axios from 'axios';
import { baseUrls, WEATHER_API_KEY } from 'app/api'
import { WeatherBarGraph } from 'components/Chart'

function  MultiLocationWeather({locations}) {
  const [weatherList, setWeatherList] = useState([]);

  useEffect(() => {  //Had to pull data multiple times since weatherAPI doesn't have a bulk retrieval.
    let res_list = [];
    (async function() {
      await locations.length > 0 && locations?.map((location, index)=>{
        (async function() {
          const { data } = await axios.get(`${baseUrls.weather}?key=${WEATHER_API_KEY}&q=${location}`, {
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
    })();
  }, [locations]);

  return (
    weatherList.length > 0 && <WeatherBarGraph data={weatherList} />
  )
}


export default MultiLocationWeather
