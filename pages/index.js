import Head from 'next/head'
import { useState, useEffect } from 'react'
import Link from 'next/link';
import styles from 'styles/Home.module.scss'
import { 
  useGetFuelsQuery,
} from 'services/pvwatts-api'
import { StationBarGraph, StationPieGraph } from 'components/Chart'
import MultiLocationWeather from 'components/Weather/MultiLocationWeather'
import { 
  Button, 
  Box,
  CircularProgress,
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  Typography,
} from '@mui/material'
import {
} from '@mui/material'

function Fuels() {
  const [showWeather, setShowWeather] = useState(false);
  const [locations, setLocations] = useState(false);
  const [skip, setSkip] = useState(false);
  const [stationsCount, setstationsCount] = useState(20);
  const {data: fuel, isSuccess} = useGetFuelsQuery(stationsCount, {skip})

  useEffect(()=>{
    setSkip(true)
    setShowWeather(false)
  }, [stationsCount])

  useEffect(()=>{
    skip && setSkip(false)
  }, [skip])

  const handleSelect = (event) => {
    setstationsCount(event.target.value);
  };

  const getSelectItems = () => {
    const items = []
    for (let i=10; i<=50; i+=10) {
      items.push(<MenuItem key={i} value={i}>{i}</MenuItem>)
    }

    return items
  }

  useEffect(() => {
    const loc_list = []
    isSuccess && fuel.fuel_stations.map(({latitude, longitude})=>(
      loc_list.push(`${latitude},${longitude}`)
    ))
    setLocations(loc_list)
  }, [isSuccess, locations]);


  return (
    <div className={styles.container}>
      <Head>
        <title>Fuel Stations Weather Watcher</title>
        <meta name="description" content="Fuel Stations Weather Watcher" />
      </Head>
      <main className={styles.main_wrapper}>
        <Typography variant='h4'  className={styles.title}>
          Fuel Stations Weather Watcher (US)
        </Typography>
        {isSuccess ?
          <div className={styles.graph_wrapper}>
            <div className={styles.select_wrapper}>
              <FormControl sx={{ width: '10rem' }}>
                <InputLabel id="stations-selector">No. of Stations</InputLabel>
                <Select
                  labelId="stations-selector"
                  id="stations-selector"
                  value={stationsCount}
                  label="No. of Stations" 
                  onChange={handleSelect}
                > 
                  {getSelectItems().map((item)=>item)}
                </Select>
              </FormControl>
            </div>
            <StationPieGraph data={fuel} />
            <StationBarGraph data={fuel} />
            {showWeather && !!locations &&
              <>
                <Typography variant='h5'>
                  Graph represents different weather conditions on each Fuel Station which affects the fuel economy.
                </Typography >
                <Typography variant='subtitle2' className={styles.select_wrapper}>
                  Fuel economy tests show that, in city driving, a conventional 
                  gasoline car's gas mileage is roughly 15% lower at 20°F than it would be at 77°F.
                  It can drop as much as 24% for short (3- to 4-mile) trips. 
                </Typography>
                <Link href='https://fuelandfriction.com/trucking-pro/5-ways-how-the-weather-affects-your-fuel-economy/'>Visit Source here.</Link>
                <MultiLocationWeather locations={locations}/>
              </> 
            }

            <div className={styles.button_wrapper}>
              <Button
                variant='outlined'
                onClick={()=>setShowWeather(!showWeather)}
              >
                {showWeather ? 'Hide' : 'Show Weather on each area'}
              </Button>
            </div>
          </div>
          : (
            <div className={styles.loading}>
              <CircularProgress />
            </div>
          )
        }
      </main>
    </div>
  )
}

export default Fuels
