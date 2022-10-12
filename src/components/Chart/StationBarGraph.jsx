import { Chart as ChartJS } from "chart.js/auto"
import { Bar } from "react-chartjs-2";
import styles from 'styles/components/Bar.module.scss'
import { useState, useEffect } from 'react';
import { chartColor } from 'utils/constants';


const options = {
  title:{
    display:true,
    text:'Average Rainfall per month',
    fontSize:20
  },
  legend:{
    display:true,
    position:'right'
  },
  plugins: {
    title: {
      display: true,
      text: 'Compressed natural gas (CNG) on each Fuel Stations',
    },
  },
  responsive: true,
  interaction: {
    mode: 'index',
    intersect: false, 
  },
}

function StationBarGraph(props) {
  const { fuel_stations } = props.data;
  const [chartData, setChartData] = useState({ready: false})


  useEffect(() => {
    fuel_stations.length > 0 &&
    setChartData({
      labels: fuel_stations?.map((location) => location.station_name  ),
      datasets: [
        {
          label: "NG Pounds per Square Inch",
          data: fuel_stations?.map((station) => station.cng_total_storage),
          backgroundColor: chartColor[0],
          borderWidth: 1,
        }
      ],
      ready: true
    });
  }, []);


  return (
    <div className={styles.station_container}>
      {chartData.ready && 
        <Bar options={options} data={chartData} />
      }
      
    </div>
  )
}


export default StationBarGraph
