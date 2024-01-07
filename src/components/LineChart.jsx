// LineChart.js
import React from 'react';
import { Line } from 'react-chartjs-2';
import 'chartjs-plugin-zoom';

const LineChart = () => {
  const data = {
    labels: ['January', 'February', 'March', 'April', 'May'],
    datasets: [
      {
        label: 'Dummy Data',
        borderColor: 'rgba(75,192,192,1)',
        backgroundColor: 'rgba(75,192,192,0.4)',
        pointBackgroundColor: '#fff',
        pointBorderColor: 'rgba(75,192,192,1)',
        pointBorderWidth: 1,
        pointRadius: 5,
        data: [65, 59, 80, 81, 56],
      },
    ],
  };

  const options = {
    scales: {
      x: [
        {
          type: 'time', // Assuming your data is time-based
          distribution: 'linear',
          time: {
            unit: 'month', // Adjust as needed (https://www.chartjs.org/docs/latest/axes/cartesian/time.html)
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

  return (
    <div className='chart-container'>
      <h2>Line Chart Example with Pan and Zoom</h2>
      <Line data={data} options={options} />
    </div>
  );
};

export default LineChart;
