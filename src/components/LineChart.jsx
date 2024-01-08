// LineChart.js
import React, { useEffect } from 'react';
import { Line } from 'react-chartjs-2';
import 'chartjs-plugin-zoom';
import { useData } from '../context/DataContext';

const LineChart = () => {
  const { filters,selectedFeature ,totalTimeSpentByFeature } = useData()

  const data = {
    labels: Object.keys(totalTimeSpentByFeature),
    datasets: [
      {
        label: 'Total Time',
        borderColor: "#3d5af1",
        backgroundColor: "#3d5af1",

        pointBorderColor: 'rgba(75,192,192,1)',
        pointBorderWidth: 1,
        pointRadius: 5,
        data: Object.values(totalTimeSpentByFeature)?? [],
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
      <h3>Line Chart with Date and total time of Feature {selectedFeature}</h3>
      <Line data={data} options={options} />
    </div>
  );
};

export default LineChart;
