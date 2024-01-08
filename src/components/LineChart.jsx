// LineChart.js
import React, { useEffect } from 'react';
import { Line } from 'react-chartjs-2';
import 'chartjs-plugin-zoom';
import { useData } from '../context/DataContext';

const LineChart = () => {
  const { ageFiltered, filters } = useData()

  const dateArray = ageFiltered?.reduce((acc, curr) => {
    if (!(acc.includes(curr.Day))) return [...acc, curr.Day]
    else return acc

  }, [])



  function calculateSumByDay(data) {
    const sumByDay = {};

    data.forEach(item => {
        const day = item.Day;
        const sum = item.A + item.B + item.C + item.D + item.E + item.F;

        if (sumByDay[day]) {
            sumByDay[day] += sum;
        } else {
            sumByDay[day] = sum;
        }
    });

    return sumByDay;
}

const totaltime = calculateSumByDay(ageFiltered)




  const data = {
    labels: dateArray,
    datasets: [
      {
        label: 'Total Time',
        borderColor: "#3d5af1",
        backgroundColor: "#3d5af1",

        pointBorderColor: 'rgba(75,192,192,1)',
        pointBorderWidth: 1,
        pointRadius: 5,
        data: Object.values(totaltime)?? [],
      },
    ],
  };

  const options = {
    scales: {
      x: [
        {
          type: 'time',
          distribution: 'linear',
          time: {
            unit: 'time',
          },
        },
      ],
      y: [
        {
          type: 'linear',
          position: 'left',
        },
      ],
    },
    plugins: {
      zoom: {
        pan: {
          enabled: true,
          mode: 'x',
        },
        zoom: {
          wheel: {
            enabled: true,
          },
          pinch: {
            enabled: true,
          },
          mode: 'x',
        },
      },
    },
  };
useEffect(()=>{

},[filters])
  return (
    <div className='chart-container'>
      <h3>Line Chart with Date and total time</h3>
      <Line data={data} options={options} />
    </div>
  );
};

export default LineChart;
