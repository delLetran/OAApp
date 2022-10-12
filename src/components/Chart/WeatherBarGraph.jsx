import { useState, useEffect } from 'react';
import styles from 'styles/components/Bar.module.scss'
import { Bar } from "react-chartjs-2";
import { chartColor } from 'utils/constants'


const options = {
  plugins: {
    title: {
      display: true,
      text: 'Weather on each Fuel Stations - Stacked',
    },
  },
  responsive: true,
  interaction: {
    mode: 'index',
    intersect: false,
  },
  scales: {
    x: {
      stacked: true,
    },
    y: {
      stacked: true,
    },
  },
};

function WeatherBarGraph(props) {
  const [chartData, setChartData] = useState({ready: false})
  useEffect(() => {
    props.data.length > 0 &&
    setChartData({
      labels: props.data?.map(({location}) => location.name),
      datasets: [
        {
          label: "Feels Like  °C",
          data: props.data?.map(({current}) => current.feelslike_c ),
          backgroundColor: chartColor[0],
          borderWidth: 1,
        },
        {
          label: "Temp °C",
          data: props.data?.map(({current}) => current.temp_c ),
          backgroundColor: chartColor[1],
          borderWidth: 1,
        },
        {
          label: "Humidity",
          data: props.data?.map(({current}) => current.humidity ),
          backgroundColor: chartColor[2],
          borderWidth: 1,
        },
        {
          label: "Gust Kph",
          data: props.data?.map(({current}) => current.gust_kph ),
          backgroundColor: chartColor[3],
          borderWidth: 1,
        }
      ],
      ready: true
    });
  }, []);


  return (
    <div className={styles.station_container}>
      { chartData.ready &&
        <Bar options={options} data={chartData} />
      }
    </div>
  )
}


export default WeatherBarGraph
