
import { Chart as ChartJS } from "chart.js/auto"
import { Pie } from "react-chartjs-2";
import { useState, useEffect } from 'react';
import styles from 'styles/components/Pie.module.scss'
import { chartColor } from "utils/constants";


const options = {
  legend:{
    display:true,
    position:'right'
  },
  plugins: {
    title: {
      display: true,
      text: 'Compressed natural gas (CNG) Pie Ratio',
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
  const [chartData, setChartData] = useState({})


  useEffect(() => {
    fuel_stations.length > 0 &&
    setChartData({
      labels: fuel_stations?.map((station) => station.city),
      datasets: [
        {
          label: "NG Pounds per Square Inch",
          data: fuel_stations?.map((station) => station.cng_total_storage),
          backgroundColor: chartColor,
          borderWidth: 1,
        }
      ]
    });
  }, [fuel_stations]);


  return (
    <div className={styles.container}>
      {
        chartData?.datasets?.length > 0 && 
        <Pie options={options} data={chartData} />
      }
    </div>
  )
}


export default StationBarGraph

